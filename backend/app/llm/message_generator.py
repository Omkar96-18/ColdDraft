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

    # Initialize the LLM with the user-requested temperature
    llm = OllamaLLM(model="llama3:8b-instruct-q4_K_M", temperature=0.8)

    # --- SENDER INFORMATION ---
    # This is dummy data representing the sender of the messages.
    sender_info = {
        "name": "Alex Doe",
        "institution": "Innovate Inc.",
        "title": "Talent Acquisition Lead",
        "message_aim": "We are looking to hire a senior software engineer and your profile on LinkedIn looks like a great fit for our team."
    }

    # Define input variables for all prompts.
    # Note: The new prompt strategy focuses on a few key data points for the email.
    common_input_variables = {
        "name": name,
        "profession": profession,
        "location": location,
        "interests": interests,
        "context_from_post": context_from_post,
        "campaign_name": campaign_name,
        "why_approaching": why_approaching,
        "sender_name": sender_info["name"],
        "sender_institution": sender_info["institution"],
        "sender_title": sender_info["title"],
        "message_aim": sender_info["message_aim"]
    }

    # This base_template is now only used for SMS and WhatsApp as a fallback.
    # The email prompt uses a new, more effective strategy.
    base_template = """
        **PROSPECT DATA:**
        - Name: {name}
        - Profession: {profession}
        - Key Interests: {interests}
        - Recent Activity/Post Context: {context_from_post}

        **SENDER & GOAL:**
        - From: {sender_name}, {sender_title} at {sender_institution}
        - Our Goal: {message_aim}
        - Why You Specifically: {why_approaching}

        Generate a short, friendly message based on the data above.
    """

    # Email Prompt - NEW STRATEGY
    # This prompt uses a "few-shot" example to guide the model. This is often more
    # effective for smaller models than abstract instructions.
    email_template_string = """
        **Task:** Write a personalized cold email from {sender_name} to {name}.

        **Key Information to Use:**
        *   Prospect's Name: {name}
        *   Prospect's Profession: {profession}
        *   Prospect's Main Interest: {interests}
        *   Something Specific They Did/Posted: "{context_from_post}"
        *   Your Goal: {message_aim}

        **Instructions:**
        1.  Start the email by mentioning their specific activity or post. This is your opening hook.
        2.  Connect that activity to their profession or main interest.
        3.  Smoothly transition to your goal, explaining why their background is a perfect fit.
        4.  Keep it short, personal, and end with a simple, low-friction question.
        5.  The email should be from {sender_name} of {sender_institution}.

        **Here is an example of a perfect email to follow:**
        "Subject: Your recent post on vector databases

        Hi {name},

        I saw your recent post about exploring vector databases for RAG applications. As someone also deep in the AI/ML space, I found your insights really sharp.

        Given your work in {profession}, I thought you might be interested to know that we at {sender_institution} are looking for a senior software engineer to help build out our next-gen search infrastructure. Your hands-on experience seems like a perfect match for what we're doing.

        Would you be open to a brief chat next week to discuss it?

        Best,
        {sender_name}"

        ---
        Now, using the **Key Information to Use**, write ONLY the new, unique, and hyper-personalized email for {name} that follows the style and structure of the example. DO NOT include any introductory or concluding remarks from yourself, just the email content. Do not copy the example, use the provided data.

        --- EMAIL ---
        """
    email_prompt = PromptTemplate(
        input_variables=list(common_input_variables.keys()),
        template=email_template_string
    )

    # SMS Prompt
    sms_prompt = PromptTemplate(
        input_variables=list(common_input_variables.keys()),
        template=f"""
        {base_template}
        ---
        Now, apply the methodology to write ONLY a concise and impactful SMS to {name}.
        The message MUST be under 160 characters. It needs a strong, personal hook to work in such a small space. DO NOT include any introductory or concluding remarks from yourself, just the SMS content.

        --- SMS ---
        """
    )

    # WhatsApp Prompt
    whatsapp_prompt = PromptTemplate(
        input_variables=list(common_input_variables.keys()),
        template=f"""
        {base_template}
        ---
        Now, apply the methodology to write ONLY a friendly, conversational WhatsApp message to {name}.
        The tone should be casual but professional. Reference their background to make it feel warm. DO NOT include any introductory or concluding remarks from yourself, just the WhatsApp content.

        --- WHATSAPP ---
        """
    )

    # Generate messages
    email_message = llm.invoke(email_prompt.format(**common_input_variables)).strip()
    sms_message = llm.invoke(sms_prompt.format(**common_input_variables)).strip()
    whatsapp_message = llm.invoke(whatsapp_prompt.format(**common_input_variables)).strip()

    return {
        "email": email_message,
        "sms": sms_message,
        "whatsapp": whatsapp_message
    }