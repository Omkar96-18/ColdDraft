import os
import json
from langchain_core.prompts import PromptTemplate
from langchain_ollama import OllamaLLM

def generate_messages(prospect_name):
    # Path to the prospect's JSON file
    prospect_file_path = os.path.join("app", "llm", "contacts", prospect_name, "prospect.json")

    # Read the prospect's data
    with open(prospect_file_path, "r") as f:
        data = json.load(f)

    prospect_info = data["prospect_info"]
    campaign_context = data["campaign_context"]

    name = prospect_info["name"]
    ethnicity = prospect_info["ethnicity"]
    profession = prospect_info["profession"]
    age = prospect_info["age"]
    gender = prospect_info["gender"]
    location = prospect_info["location"]
    interests = prospect_info["interests"]
    socials = prospect_info["socials"]
    context_from_post = prospect_info["context_from_post"]

    campaign_name = campaign_context["campaign_name"]
    campaign_type = campaign_context["type"]
    description = campaign_context["description"]
    why_approaching = campaign_context["why_approaching"]

    # Initialize the LLM
    llm = OllamaLLM(model="qwen:4b", temperature=0.7)

    # Define input variables for all prompts
    common_input_variables = {
        "name": name, "ethnicity": ethnicity, "profession": profession, "age": age,
        "gender": gender, "location": location, "interests": interests, "socials": socials,
        "context_from_post": context_from_post, "campaign_name": campaign_name,
        "campaign_type": campaign_type, "description": description, "why_approaching": why_approaching
    }

    base_template = """
        Prospect Information:
        - Name: {name}
        - Ethnicity: {ethnicity}
        - Profession: {profession}
        - Age: {age}
        - Gender: {gender}
        - Location: {location}
        - Interests: {interests}
        - Socials: {socials}
        - Context from a recent post (if available): {context_from_post}

        Campaign Context:
        - Campaign Name: {campaign_name}
        - Type: {campaign_type}
        - Description: {description}
        - Reason for approaching the prospect: {why_approaching}

        When generating, dynamically replace placeholders (e.g., {{Name}}, {{Product/Service}}, {{Campaign Name}}) with the actual provided prospect and campaign information. Do NOT use generic placeholders like [Prospect's Name] in the final output.
    """

    # Email Prompt
    email_prompt = PromptTemplate(
        input_variables=list(common_input_variables.keys()),
        template=f"""
        {base_template}
        Generate a hyper-personalized email message for {name}.
        Include a relevant subject line. The tone should be professional yet approachable.
        --- EMAIL ---
        Subject:
        Body:
        """
    )

    # SMS Prompt
    sms_prompt = PromptTemplate(
        input_variables=list(common_input_variables.keys()),
        template=f"""
        {base_template}
        Generate a concise and engaging SMS message for {name}.
        The message should be no more than 160 characters.
        --- SMS ---
        """
    )

    # WhatsApp Prompt
    whatsapp_prompt = PromptTemplate(
        input_variables=list(common_input_variables.keys()),
        template=f"""
        {base_template}
        Generate a friendly and professional WhatsApp message for {name}.
        The message should be suitable for a casual but respectful tone and no more than 500 characters.
        --- WHATSAPP ---
        """
    )

    # Generate and print messages
    print("--- EMAIL ---")
    email_message = llm.invoke(email_prompt.format(**common_input_variables))
    print(email_message.strip())

    print("\n--- SMS ---")
    sms_message = llm.invoke(sms_prompt.format(**common_input_variables))
    print(sms_message.strip())

    print("\n--- WHATSAPP ---")
    whatsapp_message = llm.invoke(whatsapp_prompt.format(**common_input_variables))
    print(whatsapp_message.strip())

if __name__ == "__main__":
    # Get all the prospect names from the contacts directory
    prospect_names = os.listdir(os.path.join("app", "llm", "contacts"))
    
    for prospect_name in prospect_names:
        print(f"Generating messages for {prospect_name}...")
        generate_messages(prospect_name)
        print("-" * 20)