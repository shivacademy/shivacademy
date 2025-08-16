import React, { useState } from 'react';
import { ChevronDown, ArrowLeft, GraduationCap, Microscope, Book, ClipboardList, BookOpen, Atom, Lightbulb, Heart, Monitor, Globe } from 'lucide-react';

// Type definitions for the application's data and props
interface LessonItem {
  q: string;
  options?: string[];
  ans: string;
  exp?: string;
}

interface LessonSection {
  heading: string;
  items: LessonItem[];
}

interface LessonContent {
  title: string;
  sections: LessonSection[];
}

// Content for Lesson 1, extracted from the provided PDF
const lesson1Content: LessonContent = {
  title: 'Unit-I Measurements',
  sections: [
    {
      heading: 'I. Choose the correct answer.',
      items: [
        { q: '1. The height of a tree can be measured by', options: ['metre scale', 'metre rod', 'plastic ruler', 'measuring tape'], ans: 'measuring tape' },
        { q: '2. Conversion of 7 m into cm gives', options: ['70 cm', '7 cm', '700 cm', '7000 cm'], ans: '700 cm' },
        { q: '3. Quantity that can be measured is called', options: ['physical quantity', 'measurement', 'unit', 'motion'], ans: 'Measurement' },
        { q: '4. Choose the correct one', options: ['km>mm>cm>m', 'km>mm>m>cm', 'km>m>cm>mm', 'km>cm>m>mm'], ans: 'km>m>cm>mm' },
        { q: '5. While measuring the length of an object using a ruler, the position of your eye should be', options: ['left side of the point.', 'vertically above the point where the measurement is to be taken.', 'right side of the point', 'anywhere according to one\'s convenience.'], ans: 'vertically above the point where the measurement is to be taken.' }
      ]
    },
    {
      heading: 'II. Fill in the blanks.',
      items: [
        { q: '1. SI Unit of length is', ans: 'metre' },
        { q: '2. 500 gm = ______ kilogram.', ans: '0.5 kilogram.' },
        { q: '3. The distance between Delhi and Chennai can be measured in', ans: 'Kilometre' },
        { q: '4. 1 m = ______ cm.', ans: '100 cm' },
        { q: '5. 5 km = ______ m.', ans: '5000m' }
      ]
    },
    {
      heading: 'III. State True or False. If false, correct the statement.',
      items: [
        { q: '1. We can say that the mass of an object is 126 kg.', ans: 'True.' },
        { q: '2. Length of one\'s chest can be measured using a metre scale.', ans: 'False. While you could use a metre scale to measure the length of one\'s chest, a flexible measuring tape is a more practical and accurate tool for measuring curved surfaces like the human body.' },
        { q: '3. Ten millimetre makes one centimetre.', ans: 'True.' },
        { q: '4. A hand span is a reliable measure of length.', ans: 'False. A hand span is not a reliable measure of length because its size varies from person to person. Standard units like metres or centimetres are used for consistent and reliable measurements.' },
        { q: '5. The SI system of units is accepted everywhere in the world.', ans: 'True.' }
      ]
    },
    {
      heading: 'IV. Complete the analogy.',
      items: [
        { q: '1. Sugar: Beam balance :: Lime juice :', ans: 'Graduated cylinder', exp: 'A beam balance is used to measure the mass of a solid like sugar. Similarly, a graduated cylinder is used to measure the volume of a liquid like lime juice.' },
        { q: '2. Height of a person: cm :: Length of your sharpened pencil lead :', ans: 'mm', exp: 'Centimetres (cm) are a suitable unit for measuring the height of a person. In the same way, millimetres (mm) are a more appropriate and precise unit for measuring something small, like the length of a sharpened pencil lead', },
        { q: '3. Milk: Volume :: Vegetables :', ans: 'Mass', exp: 'Milk is a liquid, and its quantity is measured in terms of volume. Vegetables are solid, and their quantity is measured in terms of mass.' }
      ]
    },
    {
      heading: 'V. Match the following.',
      items: [
        { q: '1. Length of the fore arm', ans: 'Cubit' },
        { q: '2. SI unit of length', ans: 'metre' },
        { q: '3. Nano', ans: '10^{-9}' },
        { q: '4. SI Unit of time', ans: 'second' },
        { q: '5. Kilo', ans: '10^{3}' }
      ]
    },
    {
      heading: 'VI. Arrange the following in the increasing order of units.',
      items: [
        { q: '1 Metre, 1 centimetre, 1 kilometre, and 1 millimetre.', ans: '1. 1 millimetre (mm)\n2. 1 centimetre (cm)\n3. 1 metre (m)\n4. 1 kilometre (km)' }
      ]
    },
    {
      heading: 'VII. Answer in a word or two.',
      items: [
        { q: '1. What is the full form of the SI system?', ans: 'The International System of Units' },
        { q: '2. Name any one instrument used for measuring mass.', ans: 'beam balance or a digital weighing scale.' },
        { q: '3. Find the odd one out. kilogram, millimetre, centimetre, nanometre', ans: 'kilogram' },
        { q: '4. What is the SI Unit of mass?', ans: 'kilogram (kg)' },
        { q: '5. What are the two parts present in a Measurement?', ans: 'a numerical value and a unit.' }
      ]
    },
    {
      heading: 'VIII. Find the answer for the following questions within the grid.',
      items: [
        { q: '1. 10^-3 is one __', ans: 'MILLIMETRE' },
        { q: '2. SI Unit of time is __', ans: 'SECOND' },
        { q: '3. Cross view of reading a measurement leads to __ P', ans: 'PARALLAX' },
        { q: '4. __ is the one that a clock reads ', ans: 'TIME' },
        { q: '5. __ is the amount of substance present in an object', ans: 'MASS' },
        { q: '6. __ can be taken to get the final reading of the recordings of different students for a single measurement', ans: 'ACCURATE' },
        { q: '7. __ is a fundamental quantity', ans: 'LENGTH' },
        { q: '8. __ shows the distance covered by an automobile ', ans: 'ODOMETER' },
        { q: '9. A tailor uses __ to take measurements to stitch the cloth', ans: 'TAPE' },
        { q: '10. Liquids are measured with this physical quantity ', ans: 'LITRES' }
      ]
    },
    {
      heading: 'IX. Answer briefly.',
      items: [
        { q: '1. Define measurement.', ans: 'The comparison of an unknown quantity with some known quantity is known as measurement.' },
        { q: '2. Define mass.', ans: 'Mass is the measure of the amount of matter in an object.' },
        { q: '3. The distance between two places is 43.65 km. Convert it into metre and cm.', ans: 'To metre: 43.65 x 1000 = 43650 m\nTo cm: 43.65 x 100000 = 4365000 cm' },
        { q: '4. What are the rules to be followed to make accurate measurement with scale?', ans: '1. Take care to write the correct submultiple.\n2. Always keep the object in parallel to the scale.\n3. Start the measurement from \'0\' of the scale.' }
      ]
    },
    {
      heading: 'X. Solve the following.',
      items: [
        { q: '1. The distance between your school and your house is 2250 m. Express this distance in kilometers.', ans: '2250 m \\ 1000 = 2.25 km.' },
        { q: '2. While measuring the length of a sharpened pencil, the reading of the scale at one end is 2.0 cm and at the other end is 12.1 cm. What is the length of the pencil?', ans: 'Length = 12.1 cm - 2.0 cm = 10.1 cm.' }
      ]
    },
    {
      heading: 'XI. Answer in detail.',
      items: [
        {
          q: '1. Explain two methods that you can use to measure the length of a curved line.',
          ans: 'Method 1: Using a String.\n\n1. Draw a curved line on a paper from where it starts (point A) and where it ends (point B).\n\n2. Now, take the string off the paper and stretch it out straight next to a ruler.\n\n3. Measure the distance between the two dots you made on the string. This is the length of your curved line!\n\nMethod 2: Using a Divider.\n\n1. Open the divider so the points are a small, set distance apart (like 1 centimeter) using a ruler.\n\n2. Starting at point A, "walk" the divider along the curved line, making small marks as you go.\n\n3. Count how many steps the divider took. You might have a tiny bit of the line left over at the end.\n\n4. Use a ruler to measure the length of that tiny leftover part.\n\n5. To find the total length, use this simple formula:\nLength = (Number of steps x length of each step) + leftover part'
        }
      ]
    }
  ]
};

// Prop types for each component
interface HomePageProps {
  goToGrades: () => void;
}

interface GradesPageProps {
  goToSubjects: (grade: number) => void;
  goToHome: () => void;
}

interface SubjectsPageProps {
  selectedGrade: number | null;
  goToGrades: () => void;
  goToTerms: (grade: number, subject: string) => void;
}

interface TermsPageProps {
  selectedGrade: number | null;
  selectedSubject: string | null;
  goToLessons: (grade: number, subject: string, term: string) => void;
  goToSubjects: (grade: number | null) => void;
}

interface LessonsPageProps {
  selectedGrade: number | null;
  selectedSubject: string | null;
  selectedTerm: string | null;
  goToLessonContent: (grade: number, subject: string, term: string, lesson: string) => void;
  goToTerms: (grade: number | null, subject: string | null) => void;
}

interface LessonContentPageProps {
  selectedLesson: string | null;
  goToLessons: (grade: number | null, subject: string | null, term: string | null) => void;
  selectedGrade: number | null;
  selectedSubject: string | null;
  selectedTerm: string | null;
}

const HomePage: React.FC<HomePageProps> = ({ goToGrades }) => {
  return (
    <>
      <header className="bg-gradient-to-r from-teal-500 to-green-600 rounded-2xl shadow-lg p-6 md:p-8 lg:p-10 text-white mb-8">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-center">Shiv Academy</h1>
      </header>

      <section className="bg-green-100 rounded-xl shadow-md p-6 md:p-8 lg:p-10 mb-8">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-800 text-center mb-4">Welcome to Shiv Academy!</h2>
        <p className="text-gray-700 text-lg md:text-xl lg:text-2xl leading-relaxed text-center">
          Are you ready to unlock your academic potential? At Shiv Academy, we believe that every student has the ability to succeed. We offer comprehensive tutoring for **all subjects** and **all academic boards**, providing personalized support to help you master challenging topics and achieve your goals.
        </p>
        <p className="text-gray-700 text-lg md:text-xl lg:text-2xl leading-relaxed text-center mt-4">
          Join us and discover a smarter way to learn. Let's start your journey to academic excellence today!
        </p>
      </section>

      <section className="flex flex-col lg:flex-row items-center justify-between gap-8 mb-8">
        <div className="w-full lg:w-1/3 flex justify-center">
          <img src="https://placehold.co/400x300/e0f2f1/004d40?text=Student+with+Laptop" alt="Student studying on a laptop" className="rounded-xl shadow-lg w-full max-w-sm h-auto object-cover" />
        </div>

        <div className="w-full lg:w-1/3 flex flex-col items-center p-6 bg-white rounded-xl shadow-lg">
          <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">Select Your Board</h3>
          <div className="relative inline-block w-full text-center">
            <button id="board-select-button" className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-transform duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 w-full flex items-center justify-between" onClick={() => {
              const dropdown = document.getElementById('board-dropdown-menu');
              if (dropdown) dropdown.classList.toggle('hidden');
            }}>
              SELECT <ChevronDown className="ml-2" />
            </button>
            <div id="board-dropdown-menu" className="absolute hidden w-full mt-2 bg-white rounded-xl shadow-xl z-10 overflow-hidden">
              <button onClick={goToGrades} className="block px-4 py-3 text-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200 w-full text-left">
                Tamil Nadu Samacheer Kalvi
              </button>
              <a href="#" className="block px-4 py-3 text-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200 text-left">CBSE</a>
              <a href="#" className="block px-4 py-3 text-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200 text-left">ICSE</a>
              <a href="#" className="block px-4 py-3 text-lg text-gray-800 hover:bg-gray-100 transition-colors duration-200 text-left">State Boards</a>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex justify-center">
          <img src="https://placehold.co/400x300/4a7c59/ffffff?text=Students+in+Class" alt="Students learning in a classroom" className="rounded-xl shadow-lg w-full max-w-sm h-auto object-cover" />
        </div>
      </section>

      <footer className="bg-gray-800 text-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 text-center mt-8">
        <p>&copy; 2024 Shiv Academy. All rights reserved.</p>
      </footer>
    </>
  );
};

const GradesPage: React.FC<GradesPageProps> = ({ goToSubjects, goToHome }) => {
  const grades = Array.from({ length: 12 }, (_, i) => i + 1);

  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <button onClick={goToHome} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Tamil Nadu Samacheer Kalvi</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
        {grades.map((grade) => (
          <button
            key={grade}
            onClick={() => goToSubjects(grade)}
            className="flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1"
          >
            <GraduationCap size={48} className="text-indigo-500 mb-2" />
            <span className="text-xl font-semibold text-gray-800">{grade}th Grade</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const SubjectsPage: React.FC<SubjectsPageProps> = ({ selectedGrade, goToGrades, goToTerms }) => {
  const subjects = [
    { name: 'Mathematics', icon: Book },
    { name: 'Science', icon: Atom },
    { name: 'Social Science', icon: Globe },
    { name: 'Language 1', icon: BookOpen },
    { name: 'Language 2', icon: BookOpen },
  ];

  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <button onClick={goToGrades} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Subjects for {selectedGrade}th Grade</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((subject, index) => (
          <button
            key={index}
            onClick={() => {
              if (selectedGrade === 6 && subject.name === 'Science') {
                goToTerms(selectedGrade, subject.name);
              } else {
                // Placeholder for other subjects
                // We use a custom dialog instead of alert()
                const dialog = document.createElement('div');
                dialog.innerHTML = `
                  <div class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
                    <div class="bg-white p-8 rounded-lg shadow-xl max-w-sm mx-auto">
                      <p class="text-lg font-semibold text-gray-800 mb-4">You selected ${subject.name} for ${selectedGrade}th Grade.</p>
                      <button id="close-dialog" class="w-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700">Close</button>
                    </div>
                  </div>
                `;
                document.body.appendChild(dialog);
                document.getElementById('close-dialog')?.addEventListener('click', () => {
                  document.body.removeChild(dialog);
                });
              }
            }}
            className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1"
          >
            <subject.icon size={36} className="text-purple-500 mr-4" />
            <span className="text-xl font-semibold text-gray-800">{subject.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const TermsPage: React.FC<TermsPageProps> = ({ selectedGrade, selectedSubject, goToLessons, goToSubjects }) => {
  const terms: string[] = ['Term I', 'Term II', 'Term III'];
  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <button onClick={() => goToSubjects(selectedGrade)} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{selectedGrade}th Grade - {selectedSubject}</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {terms.map((term, index) => (
          <button
            key={index}
            onClick={() => goToLessons(selectedGrade!, selectedSubject!, term)}
            className="flex items-center justify-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1"
          >
            <ClipboardList size={36} className="text-orange-500 mr-4" />
            <span className="text-xl font-semibold text-gray-800">{term}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const LessonsPage: React.FC<LessonsPageProps> = ({ selectedGrade, selectedSubject, selectedTerm, goToLessonContent, goToTerms }) => {
  const lessons = [
    { name: 'Lesson 1 Measurement', icon: Microscope },
    { name: 'Lesson 2 Force and Motion', icon: Lightbulb },
    { name: 'Lesson 3 Matter around Us', icon: Atom },
    { name: 'Lesson 4 The World of Plants', icon: Heart },
    { name: 'Lesson 5 The World of Animals', icon: Heart },
    { name: 'Lesson 6 Health and Hygiene', icon: Heart },
    { name: 'Lesson 7 Computer - An Introduction', icon: Monitor },
  ];
  return (
    <div className="w-full">
      <div className="flex items-center mb-6">
        <button onClick={() => goToTerms(selectedGrade, selectedSubject)} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{selectedTerm} Lessons</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map((lesson, index) => (
          <button
            key={index}
            onClick={() => goToLessonContent(selectedGrade!, selectedSubject!, selectedTerm!, lesson.name)}
            className="flex items-center p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200 transform hover:-translate-y-1 text-left"
          >
            <lesson.icon size={36} className="text-blue-500 mr-4" />
            <span className="text-xl font-semibold text-gray-800">{lesson.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

const LessonContentPage: React.FC<LessonContentPageProps> = ({ goToLessons, selectedGrade, selectedSubject, selectedTerm }) => {
  // Utility function to render multi-line text with <br/> tags
  const renderMultiLineText = (text: string) => text.split('\n').map((line, i) => <span key={i}>{line}<br/></span>);

  return (
    <div className="w-full bg-white rounded-xl shadow-lg p-6 md:p-8 lg:p-10 mb-8">
      <div className="flex items-center mb-6">
        <button onClick={() => goToLessons(selectedGrade, selectedSubject, selectedTerm)} className="p-2 mr-4 rounded-full bg-gray-200 hover:bg-gray-300 transition-colors duration-200">
          <ArrowLeft size={24} />
        </button>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">{lesson1Content.title}</h2>
      </div>
      {lesson1Content.sections.map((section, index) => (
        <div key={index} className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-2">{section.heading}</h3>
          <ul className="list-none space-y-4">
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex} className="p-4 bg-gray-100 rounded-lg shadow-inner">
                <p className="font-semibold text-lg text-gray-700">{item.q}</p>
                {item.options && (
                  <div className="mt-2 space-y-1">
                    {item.options.map((option, optIndex) => (
                      <p key={optIndex} className="text-gray-600">{`${String.fromCharCode(65 + optIndex).toLowerCase()}) ${option}`}
                      </p>
                    ))}
                  </div>
                )}
                <p className="mt-2 text-green-700 font-bold">Ans: {renderMultiLineText(item.ans)}</p>
                {item.exp && <p className="mt-2 text-600 font-bold">Explanation: {renderMultiLineText(item.exp)}</p>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'grades' | 'subjects' | 'terms' | 'lessons' | 'lesson-content'>('home');
  const [selectedGrade, setSelectedGrade] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null);
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);

  const goToHome = () => setCurrentPage('home');
  const goToGrades = () => setCurrentPage('grades');
  const goToSubjects = (grade: number | null) => {
    setSelectedGrade(grade);
    setCurrentPage('subjects');
  };
  const goToTerms = (grade: number | null, subject: string | null) => {
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    setCurrentPage('terms');
  };
  const goToLessons = (grade: number | null, subject: string | null, term: string | null) => {
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    setSelectedTerm(term);
    setCurrentPage('lessons');
  };
  const goToLessonContent = (grade: number | null, subject: string, term: string, lesson: string) => {
    setSelectedGrade(grade);
    setSelectedSubject(subject);
    setSelectedTerm(term);
    setSelectedLesson(lesson);
    setCurrentPage('lesson-content');
  };

  // Close the dropdown if the user clicks outside of it
  React.useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      const dropdown = document.getElementById('board-dropdown-menu');
      const button = document.getElementById('board-select-button');
      if (dropdown && button && !button.contains(e.target as Node) && !dropdown.contains(e.target as Node)) {
        dropdown.classList.add('hidden');
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  let content;
  switch (currentPage) {
    case 'grades':
      content = <GradesPage goToSubjects={goToSubjects} goToHome={goToHome} />;
      break;
    case 'subjects':
      content = <SubjectsPage selectedGrade={selectedGrade} goToGrades={goToGrades} goToTerms={goToTerms} />;
      break;
    case 'terms':
      content = <TermsPage selectedGrade={selectedGrade} selectedSubject={selectedSubject} goToLessons={goToLessons} goToSubjects={goToSubjects} />;
      break;
    case 'lessons':
      content = <LessonsPage selectedGrade={selectedGrade} selectedSubject={selectedSubject} selectedTerm={selectedTerm} goToLessonContent={goToLessonContent} goToTerms={goToTerms} />;
      break;
    case 'lesson-content':
      content = <LessonContentPage selectedLesson={selectedLesson} goToLessons={goToLessons} selectedGrade={selectedGrade} selectedSubject={selectedSubject} selectedTerm={selectedTerm} />;
      break;
    case 'home':
    default:
      content = <HomePage goToGrades={goToGrades} />;
  }

  return (
    <div className="container mx-auto p-4 md:p-8 lg:p-12">
      {content}
    </div>
  );
};

export default App;