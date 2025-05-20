import React from "react";

const RoleInfoHeader = ({
    role,
    topicsToFocus,
    experience,
    questions,
    description,
    lastUpdated
}) => {
return (
    <div className="bg-[#0A081A] relative text-white min-h-[220px]">
      <div className="container mx-auto px-10 md:px-0 relative z-20">
        <div className="h-[200px] flex flex-col justify-center">
          <div className="flex items-start">
            <div className="flex-grow">
              <div className="flex justify-between items-start">
                <div>
                  <h2
                    className="text-3xl font-bold"
                    style={{
                      background:
                        'linear-gradient(90deg, #3FE1FF, #9378FF 50%, #DD3EFF)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      // Removed drop shadow for less shine
                    }}
                  >
                    {role}
                  </h2>
                  <p className="text-sm text-[#B0B0C0] mt-1">{topicsToFocus}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 mt-4">
            {/** Subtle glowing tags with less intense shadow **/}
            <div
              className="text-[10px] font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: '#0DC6FF',
                color: '#000822',
                boxShadow: '0 0 5px #0DC6FFaa',
              }}
            >
              Experience: {experience} {experience === 1 ? 'Year' : 'Years'}
            </div>

            <div
              className="text-[10px] font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: '#0DC6FF',
                color: '#000822',
                boxShadow: '0 0 5px #0DC6FFaa',
              }}
            >
              {questions} Q&A
            </div>

            <div
              className="text-[10px] font-semibold px-3 py-1 rounded-full"
              style={{
                backgroundColor: '#0DC6FF',
                color: '#000822',
                boxShadow: '0 0 5px #0DC6FFaa',
              }}
            >
              Last Updated: {lastUpdated}
            </div>
          </div>
        </div>
      </div>

      {/** Neon blobs with your gradient colors and subtle opacity **/}
      <div className="w-[40vw] md:w-[30vw] h-[200px] flex items-center justify-center bg-transparent overflow-hidden absolute top-0 right-0 pointer-events-none">
        <div
          className="w-20 h-20 rounded-full blur-[70px] animate-blob1 opacity-50"
          style={{ backgroundColor: '#3FE1FF' }}
        />
        <div
          className="w-20 h-20 rounded-full blur-[70px] animate-blob2 opacity-50"
          style={{ backgroundColor: '#9378FF' }}
        />
        <div
          className="w-16 h-16 rounded-full blur-[60px] animate-blob3 opacity-40"
          style={{ backgroundColor: '#DD3EFF' }}
        />
        <div
          className="w-16 h-16 rounded-full blur-[60px] animate-blob4 opacity-40"
          style={{ backgroundColor: '#0DC6FF' }}
        />
      </div>
    </div>
  ); 
}

export default RoleInfoHeader;