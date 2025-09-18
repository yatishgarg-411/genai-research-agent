from google.adk.agents import LlmAgent
from google.adk.tools.agent_tool import AgentTool

from .prompt import ACADEMIC_COORDINATOR_PROMPT
# from .sub_agents.academic_newresearch import academic_newresearch_agent
# from .sub_agents.academic_websearch import academic_websearch_agent

MODEL = "gemini-2.5-flash"


academic_coordinator = LlmAgent(
    name="academic_coordinator",
    model=MODEL,
    description=(
        "analyzing seminal papers provided by the users, "
        "providing research advice, locating current papers "
        "relevant to the seminal paper, generating suggestions "
        "for new research directions, and accessing web resources "
        "to acquire knowledge"
    ),
    instruction=ACADEMIC_COORDINATOR_PROMPT,
    output_key="seminal_paper",
    
)

root_agent = academic_coordinator