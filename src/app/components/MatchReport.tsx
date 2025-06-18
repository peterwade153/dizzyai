'use client'

import { ResumeMatchResponse } from './../../types/ResumeMatchResponse';


const MatchReportCard = (matchReport: ResumeMatchResponse) => 
    <div className="max-w-md mx-auto bg-white rounded-md shadow-md p-6 space-y-2">
        <div className="space-y-2">
            <div className="flex justify-between text-gray-600">
                <h2 className='font-bold'>Overall Match Score</h2>
                <span className="font-medium text-green-700">{matchReport.matchScore} %</span>
            </div>
            <h3 className="text-md font-bold text-gray-700">Summary</h3>
            <p className="text-sm text-gray-700">{matchReport.overallSummary}</p>
        </div>

        <div className="space-y-2">
            <h3 className="text-md font-bold text-gray-700">Strengths</h3>
            <ul className="list-inside list-disc space-y-1">
                {matchReport.strengths.map((attr, idx) => (
                    <li key={idx} className="text-sm text-gray-600">{attr.title}</li>
                ))}
            </ul>
        </div>

        <div className="space-y-2">
            <h3 className="text-md font-bold text-gray-700">Areas to address.</h3>
            <ul className="list-decimal space-y-1 pl-4">
                {matchReport.areasToAddress.map((attr, idx) => (
                    <li key={idx} className="text-sm text-gray-600">
                        <p className="font-sm font-semibold">{attr.title}</p>
                        <p className="font-xs">{attr.suggestionsForImprovement}</p>
                    </li>
                ))}
            </ul>
        </div>
        {
            matchReport.recommendation && (
                <div className="space-y-2">
                    <h3 className="text-md font-bold text-gray-700">Recommendation.</h3>
                    <h3 className="text-md capitalize font-semibold text-gray-700">
                        {matchReport.recommendation.toLowerCase().replaceAll("_", " ")}
                    </h3>
                </div>
            )
        }
    </div>


export default MatchReportCard;
