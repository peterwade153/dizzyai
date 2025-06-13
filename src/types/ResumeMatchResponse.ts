/**
 * Represents a skill or keyword mentioned in either the resume or job description.
 */
export interface SkillOrKeyword {
    name: string; // (e.g., "TypeScript", "Agile", "Customer Service")
    relevanceScore?: number; // Optional: A score indicating its relevance to the overall match (0-1)
    inResume: boolean; // True if found in the resume
    inJobDescription: boolean; // True if found in the job description
}

/**
* Represents a specific area where the candidate excels or shines.
*/
export interface StrengthArea {
    title: string; // e.g., "Strong Backend Development Skills", "Proven Leadership"
    description: string; // Detailed explanation of why this is a strength, citing resume examples.
    keywords?: string[]; // Related keywords or skills that contribute to this strength
}

/**
 * Represents a specific area where the candidate needs to improve or address gaps.
 */
export interface ImprovementArea {
    title: string; // e.g., "Missing Cloud Experience", "Limited Project Management"
    description: string; // Detailed explanation of the gap and why it's important for the role.
    suggestions: string[]; // Actionable suggestions for improvement (e.g., "Highlight transferable skills", "Gain certification")
    keywords?: string[]; // Related keywords or skills that are missing or weak
}


/**
 * Represents a comparison of a specific resume section against the job requirements.
 */
export interface SectionMatchDetail {
    sectionName: string; // e.g., "Experience", "Skills", "Education", "Certifications"
    matchScore: number; // Score for this specific section (0-100)
    summary: string; // Brief summary of the match quality for this section
    highlights?: string[]; // Key positive points in this section related to the job
    gaps?: string[]; // Key missing points or weaknesses in this section related to the job
}


/**
 * The main response schema for the resume matching API interaction.
 */
export interface ResumeMatchResponse {
    // Overall match score
    matchScore: number; // A percentage score (0-100) indicating how well the resume matches the job requirements.
  
    // Summary of the match
    overallSummary: string; // A concise paragraph summarizing the overall fit of the resume for the job.
  
    // Areas where the candidate shines
    strengths: StrengthArea[];
  
    // Areas where the candidate needs to address
    areasToAddress: ImprovementArea[];
  
    // Detailed breakdown of the match by sections (optional, but highly valuable)
    sectionMatches?: SectionMatchDetail[];
  
    // Key skills and keywords identified from both resume and job description
    matchedKeywordsAndSkills: SkillOrKeyword[];
  
    // Optional: A more direct and specific recommendation
    recommendation?: {
      action: 'SHORTLIST' | 'REVIEW_CAREFULLY' | 'REJECT';
      reason: string; // Explanation for the recommendation
    };
  
    // Optional: Any warnings or disclaimers from the AI
    warnings?: string[];
    
    // Optional: The version or model used for matching (for tracking)
    modelInfo?: {
      modelName: string;
      modelVersion?: string;
    };
}
