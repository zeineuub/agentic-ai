from pydantic import BaseModel, Field, model_validator
from typing import List, Optional,Annotated

class UserQuery(BaseModel):
    query: str
    # options: Optional[Annotated[list[str] | None, Field(default=None, description="Options like search/thinking")]

    # @model_validator(mode="after")
    # def validate_query(cls, values):
    #     query = values.get("query")
    #     if not query or not query.strip():
    #         raise ValueError("Query cannot be empty or just whitespace")
    #     return values

    # @model_validator(mode="after")
    # def validate_option(cls, values):
    #     options = values.get("options")
    #     if options is not None:
    #         valid_options = {"search", "thinking"}  # Allowed values
    #         if not all(option in valid_options for option in options):
    #             raise ValueError(f"Options must be either 'search' or 'thinking', got {options}")
    #     return values

class LLMResponse(BaseModel):
    response: str 
    # resources: Annotated[list[str] | None, Field(default=None, description="Resources used to generate the response")]
    # documents: Annotated[list[str] | None, Field(default=None, description="Documents used to generate the response")]
    # pdfs_generated: Annotated[list[str] | None, Field(default=None, description="PDFs generated from the response")]


    # @model_validator(mode="after")
    # def validate_pdf_size(cls, values):
    #     pdfs_generated = values.get("pdfs_generated")
    #     if pdfs_generated is not None:
    #         for pdf in pdfs_generated:
    #             if len(pdf) > 10 * 1024 * 1024:
    #                 raise ValueError("PDF size exceeds 10MB limit")
                