import os
import json
from pathlib import Path

# Ensures filename is safe for file systems
def get_valid_filename(name):
    return "".join(c for c in name if c.isalnum() or c in (' ', '-', '_')).strip()

def save_prospect_json(prospect_data: dict, campaign_data):
    # 1. Define Base Path: app/llm/contacts
    # Using Path for cross-platform compatibility (Windows/Linux)
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
        # Note: accessing attributes directly as it's an SQLAlchemy model
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

    # 6. Write JSON File
    file_path = prospect_folder / "prospect.json"
    
    with open(file_path, 'w', encoding='utf-8') as f:
        json.dump(llm_context, f, indent=4, ensure_ascii=False)
        
    return str(file_path)