import os
import json
from pathlib import Path
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_chroma import Chroma
from langchain_core.documents import Document

# --- CONFIGURATION ---
# 1. Define the Offline Embedding Model
# This downloads the model to your local cache once, then runs offline.
# We use 'cpu' by default. Change to 'cuda' if you have an NVIDIA GPU.
EMBEDDING_MODEL = HuggingFaceEmbeddings(
    model_name="sentence-transformers/all-MiniLM-L6-v2",
    model_kwargs={'device': 'cpu'}, 
    encode_kwargs={'normalize_embeddings': False}
)

def get_valid_filename(name):
    """Ensures filename is safe for file systems"""
    return "".join(c for c in name if c.isalnum() or c in (' ', '-', '_')).strip()

def save_prospect_json(prospect_data: dict, campaign_data):
    """
    Saves prospect data to JSON and creates an offline Vector DB (Chroma)
    """
    
    # 1. Define Base Path: app/llm/contacts
    base_path = Path("app/llm/contacts")
    
    # 2. Create Prospect Folder Name
    folder_name = get_valid_filename(prospect_data['full_name'])
    prospect_folder = base_path / folder_name
    
    # 3. Create Directory if it doesn't exist
    os.makedirs(prospect_folder, exist_ok=True)
    
    # 4. Construct Context Data (The Content)
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
            "recent_post_analysis": prospect_data.get('previous_post_text')
        },
        "campaign_context": {
            "campaign_name": campaign_data.name,
            "type": campaign_data.type,
            "description": campaign_data.description,
            "why_approaching": "" # Populated below
        }
    }

    # 5. Populate "Why Approaching" logic
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

    # 6. Save the JSON File
    json_file_path = prospect_folder / "prospect.json"
    
    # Convert dict to string for file writing AND for embedding
    json_content_str = json.dumps(llm_context, indent=4, ensure_ascii=False)

    with open(json_file_path, 'w', encoding='utf-8') as f:
        f.write(json_content_str)

    # --- 7. CREATE OFFLINE VECTOR DB (Buddy Model) ---
    try:
        vector_db_path = prospect_folder / "vector_db"
        
        # We wrap the JSON string into a Document
        # Metadata helps you filter later if needed
        doc = Document(
            page_content=json_content_str,
            metadata={
                "source": str(json_file_path),
                "prospect_name": prospect_data['full_name'],
                "campaign_id": str(campaign_data.id)
            }
        )

        # Create ChromaDB using the offline embedding model
        # persist_directory ensures it saves to disk
        vector_store = Chroma.from_documents(
            documents=[doc],
            embedding=EMBEDDING_MODEL,
            persist_directory=str(vector_db_path)
        )
        
        print(f"✅ Offline Vector DB created at: {vector_db_path}")
        
    except Exception as e:
        print(f"❌ Error creating Vector DB: {e}")

    return str(json_file_path)