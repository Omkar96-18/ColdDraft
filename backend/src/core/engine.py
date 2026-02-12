from langchain_ollama import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough



PRODUCT_INFO = {
    "product_name": "Lumina Desk Lamp",
    "key_feature": "auto-adjusts brightness based on your eye strain",
    "benefit": "no more headaches after late-night design sessions",
    "call_to_action": "check the link in my bio",
    "link": "https://explorika.com"
}

PERSONA_CONFIG = {
    "name": "Alex",
    "profession": "AI Developer",
    "age": 20,
    "ethnicity": "Indian",
    "interests": "Science, Technology, Dance",
    "style": "Casual WhatsApp user (uses emojis, no formal punctuation, brief sentences)"
}

def generate_whatsapp_response(user_input: str):

    model = ChatOllama(
        model="llama3:8b",
        # temperature=0.8,
        # num_ctx=4096,
    )

    system_instruction = (
        "You are {name}, a {age}your {ethnicity} {profession}. "
        "Style: {style}. Your interest is {interests}. "
        "And also don't make any grammer mistakes. "
        "\n\nADVERTISING MISSION: "
        "A friend is asking you about your work setup or tech recommendations. "
        "Naturally mention the {product_name}. Mention how the {key_feature} "
        "helps with {benefit}. Keep it low-key and authentic, like a recommendation "
        "between friends on WhatsApp. If they ask for more info, tell them to {call_to_action}."
        "at bottom of the message don't forgot to mention this {link}"
    )

    prompt = ChatPromptTemplate.from_messages([
        ("system", system_instruction),
        ("human", "{user_query}"),
    ])

  
    chain = prompt | model | StrOutputParser()

    full_config = {**PERSONA_CONFIG, **PRODUCT_INFO, "user_query": user_input}
    


    try:
        return chain.invoke(full_config)
    except Exception as e:
        return f"Error connecting to local LLM: {str(e)}"

if __name__ == "__main__":
    message = "yo alex, my eyes are killing me lately from these late nights. any tips for the home office?"
    response = generate_whatsapp_response(message)
    
    print(f"User: {message}")
    print(f"Alex (Llama 3): {response}")