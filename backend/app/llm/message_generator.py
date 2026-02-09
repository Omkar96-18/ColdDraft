
import os
import json
from langchain_core.prompts import PromptTemplate
from langchain_community.llms import Ollama

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
    llm = Ollama(model="qwen:4b")

    # Create the prompt template
    prompt = PromptTemplate(
        input_variables=[
            "name", "ethnicity", "profession", "age", "gender", "location",
            "interests", "socials", "context_from_post", "campaign_name",
            "campaign_type", "description", "why_approaching"
        ],
        template="""
        As a world-class communication expert, your task is to craft hyper-personalized messages to a prospect named {name}.
        The messages should be tailored to the prospect's background, interests, and the context of the campaign.
        
        Here is the prospect's information:
        - Name: {name}
        - Ethnicity: {ethnicity}
        - Profession: {profession}
        - Age: {age}
        - Gender: {gender}
        - Location: {location}
        - Interests: {interests}
        - Socials: {socials}
        - Context from post: {context_from_post}

        Here is the campaign context:
        - Campaign Name: {campaign_name}
        - Type: {campaign_type}
        - Description: {description}
        - Why we are approaching them: {why_approaching}

        Now, generate the following messages:
        1. A hyper-personalized email.
        2. A concise and engaging SMS message.
        3. A friendly and professional WhatsApp message.
        
        The tone should be professional yet approachable.
        """
    )

    # Generate the messages
    messages = llm.invoke(prompt.format(
        name=name, ethnicity=ethnicity, profession=profession, age=age,
        gender=gender, location=location, interests=interests, socials=socials,
        context_from_post=context_from_post, campaign_name=campaign_name,
        campaign_type=campaign_type, description=description, why_approaching=why_approaching
    ))

    # Print the messages
    print(messages)

if __name__ == "__main__":
    # Get all the prospect names from the contacts directory
    prospect_names = os.listdir(os.path.join("app", "llm", "contacts"))
    
    for prospect_name in prospect_names:
        print(f"Generating messages for {prospect_name}...")
        generate_messages(prospect_name)
        print("-" * 20)
