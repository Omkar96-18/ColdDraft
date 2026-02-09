import os
import json
from pathlib import Path

# --- LangChain & Vector DB Imports ---
from langchain_core.documents import Document
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.vectorstores import Chroma

# Ensures filename is safe for file systems
def get_valid_filename(name):
    return "".join(c for c in name if c.isalnum() or c in (' ', '-', '_')).strip()

def save_prospect_json(prospect_data: dict, campaign_data):
    # 1. Define Base Path: app/llm/contacts
    base_path = Path("app/llm/contacts")
    
    # 2. Create Prospect Folder Name
    folder_name = get_valid_filename(prospect_data['full_name'])
    prospect_folder = base_path / folder_name
    
    # 3. Create Directory if not exists
    os.makedirs(prospect_folder, exist_ok=True)
    
    # 4. Construct LLM Context Data
    llm_context = {
        "prospect_info": {
            "name": prospect_data['full_name'],
            "ethnicity": prospect_data.get('ethnicity'),
            "profession": prospect_data.get('profession'),
            "age": prospect_data.get('age'),
            "gender": prospect_data.get('gender'),
            "location": prospect_data.get('region'),
            "interests": prospect_data.get('interests_hobbies'),
            "socials": {
                "linkedin": prospect_data.get('linkedin_url'),
                "instagram": prospect_data.get('instagram_url'),
                "portfolio": prospect_data.get('portfolio_url')
            },
            "context_from_post": prospect_data.get('previous_post_text')
        },
        "campaign_context": {
            "campaign_name": campaign_data.name,
            "type": campaign_data.type,
            "description": campaign_data.description,
            "why_approaching": "" # Populated below
        }
    }

    # 5. Populate "Why Approaching" based on Campaign Type
    if campaign_data.type == "sales":
        llm_context["campaign_context"]["why_approaching"] = (
            f"Selling product '{campaign_data.product_name}' at {campaign_data.product_price}. "
            f"Key details: {campaign_data.product_desc}"
        )
    elif campaign_data.type == "hiring":
        llm_context["campaign_context"]["why_approaching"] = (
            f"Hiring for '{campaign_data.role_title}' role requiring {campaign_data.experience_years} years exp. "
            f"Location: {campaign_data.location}. Skills: {campaign_data.skills_required}"
        )
    elif campaign_data.type == "networking":
        llm_context["campaign_context"]["why_approaching"] = (
            f"Goal is {campaign_data.relationship_goal}. "
            f"Initial context: {campaign_data.intro_context}. Target Industry: {campaign_data.target_industry}"
        )

    # 6. Write JSON File (Standard Backup)
    json_file_path = prospect_folder / "prospect.json"
    with open(json_file_path, 'w', encoding='utf-8') as f:
        json.dump(llm_context, f, indent=4, ensure_ascii=False)
        
    # --- STEP 7: CREATE VECTOR DB ---
    try:
        print(f"🧠 Generating Vector Embeddings for {prospect_data['full_name']}...")
        
        # A. Prepare the data as a LangChain Document
        # We dump the entire JSON context as a string so the LLM can read it all.
        text_content = json.dumps(llm_context, indent=2)
        doc = Document(
            page_content=text_content, 
            metadata={"source": str(json_file_path), "name": prospect_data['full_name']}
        )

        # B. Initialize Embedding Model
        # using 'all-MiniLM-L6-v2' (Standard, fast, lightweight for local CPU)
        embeddings = HuggingFaceEmbeddings(model_name="all-MiniLM-L6-v2")

        # C. Define Vector DB Path inside the prospect folder
        vector_db_path = prospect_folder / "chroma_db"

        # D. Create and Persist Chroma DB
        # This creates the 'chroma_db' folder and saves the embeddings there
        vector_db = Chroma.from_documents(
            documents=[doc],
            embedding=embeddings,
            persist_directory=str(vector_db_path)
        )
        
        print(f"✅ Vector DB created at: {vector_db_path}")

    except Exception as e:
        print(f"❌ Error creating Vector DB: {e}")
        # We don't stop the function here because the JSON was saved successfully,
        # but you should check your console logs if embeddings fail.

    return str(json_file_path)