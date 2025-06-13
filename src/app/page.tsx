'use client';

import { useState } from "react";

import { ResumeMatchResponse } from './../types/ResumeMatchResponse';


export default function Home() {
  const [resume, setResume] = useState('');
  const [jobUrl, setjobUrl] = useState('');
  const [matchResult, setMatchResult] = useState<ResumeMatchResponse | null >(null);

  const onSubmit = async () => {
    try {
      const response = await fetch('api/match', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resume: resume, jobUrl: jobUrl })
      })
      const resumeMatchResult: ResumeMatchResponse = await response.json();

      if (response.ok) {
        setMatchResult(resumeMatchResult)
      }
    } catch (error: any) {
      console.log("Request Failed!", error)
    }
  };

  return (
    <div className="flex justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="min-h-screen">
        <p className='text-3xl text-center mb-1 font-bold'>Dizzy-ai</p>
        <p className='text-xl text-center mb-4 font-bold font-mono'>ai Matching Resume to a role</p>

        <form className="max-w-md mx-auto  space-y-4">
          <div>
            <label className="block font-medium text-m w-full mb-1" htmlFor="resume">Upload Resume *</label>
            <input 
              className="block mb-1 file:mr-4 file:font-semibold file:py-1 file:px-1 file:rounded-full file:border-0 file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 " 
              type="file" 
              accept=".pdf, .txt, .doc, .docx" 
              id="resume"
              name="resume"
              required
              onChange={(e) => setResume(e.target.value)}
            />
          </div>
          <div>
            <label className="block font-medium text-m w-full mb-1 text-gray-300" htmlFor="job_url">Job URL: *</label>
            <input 
              className="w-full py-2 px-2 border border-gray-300 rounded-sm" 
              type="url" 
              placeholder="https://example.com/role/1/admin-assistant" 
              id="job_url"
              name="job_url"
              required
              onChange={(e) => setjobUrl(e.target.value)}
            />
          </div>
          <button 
            className="w-full py-2 px-4 bg-blue-400 text-white rounded-lg hover:bg-blue-700 transition" 
            type="submit"
            onClick={onSubmit}
            >Submit</button>
        </form>
      </main>
    </div>
  );
}
