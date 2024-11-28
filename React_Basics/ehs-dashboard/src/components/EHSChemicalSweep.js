import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from './ui/card';
import { CheckCircle, AlertTriangle, Lightbulb } from 'lucide-react';

const EHSChemicalSweep = () => {
  const departments = [
    {
      title: "본관 1/2/3F 생기/생산",
      goodPoints: [
        "케스테르, 납땜(무연)",
        "3D Printer 용 ABSs",
        "마법의 청소박사",
        "클리넬 유니버셜 와입스",
        "ULTRA DRY-PAK"
      ],
      weaknesses: [
        "Ecoworks Cleaning Agent Pouch A and B",
        "Super Lube® Multi-Purpose Synthetic Grease with Syncolon®",
        "WD-40 에어로졸 캔"
      ],
      recommendations: [
        "핫멜트글루스틱(SB-922)"
      ]
    },
    {
      title: "본관지하/창고 시설",
      goodPoints: [
        "Boiler mate IS-102K",
        "염화 칼슘, 디히드레디트"
      ],
      weaknesses: [],
      recommendations: []
    },
    {
      title: "신관 4/5F 연구소",
      goodPoints: [
        "ABS, ASA, SR-30, L3001 3D Printing Filament",
        "핫멜트글루스틱(SB-922)",
        "Flux-Off Rosin",
        "NOKORODE REGULAR PASTE FLUX",
        "SF-1013",
        "케스테르, 납땜(무연)"
      ],
      weaknesses: [
        "3D Printer Foundation sheet"
      ],
      recommendations: [
        "CA PRIMER GOLD"
      ]
    }
  ];

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold mb-6">2024 EHS Chemical Sweep Results</h1>
      
      {departments.map((dept, index) => (
        <Card key={index} className="mb-6">
          <CardHeader>
            <CardTitle className="text-xl">{dept.title} Results</CardTitle>
          </CardHeader>
          <CardContent>
            {dept.goodPoints.length > 0 && (
              <div className="mb-4">
                <h3 className="flex items-center text-green-600 font-semibold mb-2">
                  <CheckCircle className="mr-2" size={20} />
                  PASS/GOOD Points
                </h3>
                <ul className="list-disc pl-8 space-y-1">
                  {dept.goodPoints.map((point, idx) => (
                    <li key={idx} className="text-green-700">{point}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {dept.weaknesses.length > 0 && (
              <div className="mb-4">
                <h3 className="flex items-center text-red-600 font-semibold mb-2">
                  <AlertTriangle className="mr-2" size={20} />
                  Weaknesses
                </h3>
                <ul className="list-disc pl-8 space-y-1">
                  {dept.weaknesses.map((point, idx) => (
                    <li key={idx} className="text-red-700">{point}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {dept.recommendations.length > 0 && (
              <div className="mb-4">
                <h3 className="flex items-center text-blue-600 font-semibold mb-2">
                  <Lightbulb className="mr-2" size={20} />
                  Recommendations
                </h3>
                <ul className="list-disc pl-8 space-y-1">
                  {dept.recommendations.map((point, idx) => (
                    <li key={idx} className="text-blue-700">{point}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default EHSChemicalSweep;