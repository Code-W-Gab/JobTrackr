import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

type faqType = {
  question: string,
  answer: string
}

export default function FaqSection() {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const faqs: faqType[] = [
    { question: "Is JobTrackr free to use?", answer: "Yes! Our Starter plan is completely free with up to 50 applications. Pro and Team plans unlock advanced features." },
    { question: "Can I import applications from LinkedIn?", answer: "Pro plan users can bulk import applications via CSV export from LinkedIn, Indeed, and other major platforms." },
    { question: "Does JobTrackr send email notifications?", answer: "Yes, with an email connected account, JobTrackr can send follow-up reminders and interview prep notifications." },
    { question: "Is my data secure?", answer: "Absolutely. All data is encrypted at rest and in transit. We never sell your personal information to third parties." },
    { question: "Can I cancel anytime?", answer: "Yes, you can cancel your subscription at any time. Your data will remain accessible for 30 days after cancellation." }
  ]

  return(
    <main className="py-16 px-4">
      <div className="space-y-3 text-center pb-16 px-4">
        <h2 className="font-semibold text-indigo-500 text-xs uppercase tracking-wider">FAQ</h2>
        <h1 className="text-3xl font-bold">Frequently Asked Questions</h1>
       </div>
      <div className="max-w-3xl mx-auto space-y-4 ">
        {faqs.map((faq, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 hover:bg-gray-100 transition-colors duration-300" onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
            <div className="flex items-center gap-4 cursor-pointer">
              <h3 className="text-xs font-semibold text-gray-800">{faq.question}</h3>
              <button className="ml-auto">
                {expandedIndex === index ? <ChevronUp size={18} className='text-gray-500'/> : <ChevronDown size={18} className='text-gray-500'/>}
              </button>
            </div>
            {expandedIndex === index && (
              <p className="text-gray-600 mt-2 text-xs">{faq.answer}</p>
            )}
          </div>
        ))}
      </div>
    </main>
  )
}