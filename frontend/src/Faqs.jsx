// // src/FAQs.jsx
// import React, { useState } from "react";

// const Collapsible = ({ title, children }) => {
//     const [open, setOpen] = useState(false);
//     return (
//         <div className="mb-4 border rounded-lg overflow-hidden">
//             <button
//                 onClick={() => setOpen((s) => !s)}
//                 className="w-full text-left px-4 py-3 flex justify-between items-center bg-white"
//             >
//                 <span className="font-medium">{title}</span>
//                 <span className="text-sm text-slate-500">{open ? "−" : "+"}</span>
//             </button>
//             {open && (
//                 <div className="px-4 py-4 bg-slate-50 text-left">
//                     {children}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default function FAQs() {
//     return (
//         <div className="max-w-5xl mx-auto py-12 px-4">
//             <h1 className="text-4xl font-extrabold text-center mb-6">Frequently Asked Questions</h1>

//             {/* General */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">General FAQs</h2>

//                 <Collapsible title="Can I change my T-shirt size?">
//                     <p className="mb-2 text-left">
//                         Yes — T-shirt size can be changed within 14 days of registration or until registrations close.
//                         <br />
//                         After bib allocation, size changes will not be allowed.
//                     </p>
//                 </Collapsible>

//                 <Collapsible title="Can I change my race category?">
//                     <p className="mb-3 text-left">Yes, race category changes are allowed before the registration deadline.</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
//                         <li>Upgrades require additional payment.</li>
//                         <li>Downgrades are allowed, but the fee difference is non-refundable.</li>
//                     </ul>
//                 </Collapsible>

//                 <Collapsible title="Can I transfer my registration to someone else?">
//                     <p className="text-left">Yes, registration transfer is allowed before registration closes.</p>
//                     <p className="text-left">A nominal transfer processing fee may apply. Transfers are allowed before registrations close.</p>
//                 </Collapsible>

//                 <Collapsible title="What if I miss the cut-off time?">
//                     <p className="text-left">If you miss the official cut-off time:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
//                         <li>Your timing will not count for ranking.</li>
//                         <li>You may still complete the run at your own pace.</li>
//                     </ul>
//                 </Collapsible>

//                 <Collapsible title="What is included in the race kit?">
//                     <p className="text-left mb-2">Race kit includes:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
//                         <li>Bib with timing chip</li>
//                         <li>Event T-shirt</li>
//                         <li>Safety pins / fasteners</li>
//                         <li>Route map</li>
//                         <li>Event instructions</li>
//                         <li>Sponsor coupons (if applicable)</li>
//                     </ul>
//                 </Collapsible>

//                 <Collapsible title="When and where is the expo/bib collection?">
//                     <p className="text-left">
//                         Expo/Bib Collection details will be shared closer to the event date on the website and via email/SMS.
//                         <br />
//                         Usually held 1–2 days before the event.
//                     </p>
//                 </Collapsible>

//                 <Collapsible title="Will there be hydration points?">
//                     <p className="text-left">Yes, hydration stations will be placed every 2–3 km across all routes.</p>
//                     <br />
//                     <p className="text-left">Stations will include:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
//                         <li>Water</li>
//                         <li>Electrolytes</li>
//                         <li>Basic medical support</li>
//                     </ul>
//                 </Collapsible>

//                 <Collapsible title="Will medical aid be available?">
//                     <p className="text-left">Yes, medical support will be available at multiple points:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
//                         <li>Medical tents</li>
//                         <li>On-route first-aid teams</li>
//                         <li>Ambulances</li>
//                         <li>Finish line medical zone</li>
//                     </ul>
//                 </Collapsible>

//                 <Collapsible title="Are pets or strollers allowed at the event?">
//                     <p className="text-left">No, pets are not allowed for safety reasons.</p>
//                 </Collapsible>

//                 <Collapsible title="Are strollers allowed?">
//                     <p className="text-left">No, strollers/prams/bicycles/wheeled devices are not permitted on the run route.
//                     </p>
//                 </Collapsible>

//                 <Collapsible title="Can children participate?">
//                     <p className="text-left">
//                         Yes — children can participate in age-appropriate categories (if available). <br />
//                         Participants under 16 must submit parent/guardian consent and valid age proof.
//                     </p>

//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
//                         <li>Parent/guardian consent</li>
//                         <li>Valid age proof</li>
//                     </ul>

//                 </Collapsible>

//                 <Collapsible title="What are the prize categories?">
//                     <p className="text-left">
//                         Prize categories include:
//                     </p>

//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
//                         <li>Overall winners</li>
//                         <li>Age-group categories</li>
//                         <li>Male & Female categories</li>
//                     </ul>
//                 </Collapsible>

//                 <Collapsible title="What documents are required?">
//                     <p className="text-left">
//                         Documents required include:
//                     </p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
//                         <li>Valid Government ID</li>
//                         <li>Age proof</li>
//                         <li>Medical certificate (if required)</li>
//                         <li>Consent form (for minors)</li>
//                     </ul>
//                 </Collapsible>

//                 <Collapsible title="When will the results be available?">
//                     <p className="text-left font-bold">Podium Results (Winners Announcement)</p>
//                     <p className="text-left">Podium finishers for each category (Overall Men & Women) will be announced immediately after the race at the
//                         event venue.</p>
//                     <br />
//                     <p className="text-left font-bold">Official Timing Results (All Participants)</p>
//                     <p className="text-left">Official race results for all participants will be uploaded on the website within 24–48 hours after the event.
//                         <br />
//                         Runners will also receive an email/SMS notification once results are live.</p>

//                 </Collapsible>

//                 <Collapsible title="How can I download my photos?">
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
//                         <li>Event photos will be available within 24-48hours after the event.</li>
//                         <li>You can search and download using your bib number.</li>
//                     </ul>
//                 </Collapsible>
//             </section>

//             {/* Refund / Cancellation */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Refund & Cancellation</h2>

//                 {/* 16 */}
//                 <Collapsible title="Can I get a refund if I cannot participate?">
//                     <p className="text-left">
//                         In case the event is cancelled due to force majeure reasons (weather, government orders, natural disaster,
//                         safety issues, or any emergency beyond organizer control), the following options may be offered to registered participants:
//                     </p>

//                     <ol className="list-decimal list-inside text-left text-sm text-slate-700 mt-3 space-y-2">
//                         <li>
//                             <strong>Deferral Option</strong>
//                             <div className="ml-4">Your registration may be automatically shifted to the next scheduled edition of the event.</div>
//                         </li>

//                         <li>
//                             <strong>Transfer Option</strong>
//                             <div className="ml-4">You may be allowed to transfer your registration to another city/event of Sprints Saga India (subject to availability).</div>
//                         </li>

//                         <li>
//                             <strong>Partial Refund Policy (Based on Event Proximity)</strong>
//                             <div className="ml-4">If the organizer decides to offer a refund, it will be processed as per the following percentage-slab system:</div>
//                         </li>
//                     </ol>

//                     {/* Refund Table */}
//                     <div className="overflow-x-auto mt-4">
//                         <table className="w-full text-sm border-collapse">
//                             <thead>
//                                 <tr className="bg-white/60">
//                                     <th className="p-3 border text-left">Days Remaining Before Event</th>
//                                     <th className="p-3 border text-left">Refund Eligibility</th>
//                                 </tr>
//                             </thead>

//                             <tbody>
//                                 <tr>
//                                     <td className="p-3 border">More than 90 days</td>
//                                     <td className="p-3 border">70% refund</td>
//                                 </tr>
//                                 <tr className="bg-white">
//                                     <td className="p-3 border">60–90 days</td>
//                                     <td className="p-3 border">50% refund</td>
//                                 </tr>
//                                 <tr>
//                                     <td className="p-3 border">30–60 days</td>
//                                     <td className="p-3 border">30% refund</td>
//                                 </tr>
//                                 <tr className="bg-white">
//                                     <td className="p-3 border">Less than 30 days</td>
//                                     <td className="p-3 border">0% refund (No refund – only deferral)</td>
//                                 </tr>
//                             </tbody>
//                         </table>
//                     </div>

//                     {/* Notes */}
//                     <p className="font-medium mt-4">Note:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
//                         <li>Processing fee / payment gateway charges are non-refundable.</li>
//                         <li>Refund amount will be credited within 7–14 working days.</li>
//                         <li>Refund policy applies only if the organizer officially announces refunds.</li>
//                         <li>Merchandise/add-ons are non-refundable.</li>
//                     </ul>
//                 </Collapsible>

//                 {/* 17 */}
//                 <Collapsible title="What are the reporting times?">
//                     <p className="text-left">
//                         Reporting times will be mentioned in your confirmation email and on the event page.
//                         Each category has a different reporting &amp; flag-off time.
//                     </p>
//                 </Collapsible>

//                 {/* 18 */}
//                 <Collapsible title="Is baggage allowed?">
//                     <p className="text-left">
//                         Yes, baggage storage will be available.
//                         However, the organizer is not responsible for any loss or damage.
//                     </p>
//                 </Collapsible>

//                 {/* 19 */}
//                 <Collapsible title="Is parking available at the venue?">
//                     <p className="text-left">
//                         Limited parking may be available.
//                         Participants are encouraged to carpool or use public transport.
//                     </p>
//                 </Collapsible>

//                 {/* 20 */}
//                 <Collapsible title="Will the route map be shared?">
//                     <p className="text-left">
//                         Yes, the official route map will be uploaded on the website and emailed before the event.
//                     </p>
//                 </Collapsible>
//             </section>


//             {/* Registration */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Registration FAQs</h2>

//                 <Collapsible title="How can I register for the event?">
//                     <p className="text-left">You can register online through the official event website. Select your category, fill in your details, and complete the
//                         payment process.
//                     </p>
//                 </Collapsible>

//                 <Collapsible title="Do I need to create an account to register?">
//                     <p className="text-left">Yes, registration can be completed creating an account. Your confirmation and updates will be sent to your
//                         email/SMS.
//                     </p>
//                 </Collapsible>

//                 <Collapsible title="What payment methods are accepted?">
//                     <p className="text-left font-bold">We accept:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
//                         <li>UPI</li>
//                         <li>Debit/Credit Cards</li>
//                         <li>Net Banking</li>
//                         <li>Wallets</li>
//                     </ul>
//                 </Collapsible>

//                 <Collapsible title="Will I get a confirmation after registering?">
//                     <p className="text-left font-bold">Yes, you will receive:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
//                         <li>Email confirmation</li>
//                         <li>SMS confirmation</li>
//                         <li>Unique registration ID</li>
//                     </ul>
//                 </Collapsible>

//                 <Collapsible title="Can I register on the event day?">
//                     <p className="text-left">No, on-spot registrations are not allowed. You must register before the deadline.
//                     </p>
//                 </Collapsible>

//                 <Collapsible title="Is group or corporate registration available?">
//                     <p className="text-left">Yes, group/corporate registrations are available. Contact the event team for bulk entry support.
//                     </p>
//                 </Collapsible>
//             </section>

//             {/* Timing Chip */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Timing Chip FAQs</h2>

//                 {/* 1 */}
//                 <Collapsible title="1. What is a timing chip?">
//                     <p className="text-left">
//                         It is an electronic sensor attached to your bib number that tracks your official race time.
//                     </p>
//                 </Collapsible>

//                 {/* 2 */}
//                 <Collapsible title="2. How does the timing chip work?">
//                     <p className="text-left mb-2">The chip records your time when you cross:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
//                         <li>Start line</li>
//                         <li>Timing mats on the route</li>
//                         <li>Finish line</li>
//                     </ul>
//                 </Collapsible>

//                 {/* 3 */}
//                 <Collapsible title="3. Do all categories get a timing chip?">
//                     <p className="text-left">
//                         Only timed competitive categories get timing chips.
//                         Fun run/walk categories may not include timing.
//                     </p>
//                 </Collapsible>

//                 {/* 4 */}
//                 <Collapsible title="4. What if my timing chip doesn’t work?">
//                     <p className="text-left">
//                         If your chip is damaged or not detected, your timing may not be recorded.
//                         Please handle the bib carefully.
//                     </p>
//                 </Collapsible>

//                 {/* 5 */}
//                 <Collapsible title="5. Where should I wear my bib?">
//                     <p className="text-left">
//                         Wear your bib on the front of your T-shirt, visible and unobstructed, to ensure proper timing.
//                     </p>
//                 </Collapsible>
//             </section>


//             {/* Safety & Medical */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Safety & Medical</h2>

//                 {/* 1 */}
//                 <Collapsible title="1. Is the event safe for all participants?">
//                     <p className="text-left">
//                         Yes. Safety is our highest priority and proper arrangements are provided on the route and venue.
//                     </p>
//                 </Collapsible>

//                 {/* 2 */}
//                 <Collapsible title="2. Will there be medical support?">
//                     <p className="text-left mb-2">Yes, full medical support includes:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
//                         <li>Ambulances</li>
//                         <li>Medical tents</li>
//                         <li>First-aid stations</li>
//                         <li>On-ground medical volunteers</li>
//                     </ul>
//                 </Collapsible>

//                 {/* 3 */}
//                 <Collapsible title="3. Can I run if I have a medical condition?">
//                     <p className="text-left">
//                         Participants with medical conditions must consult a doctor before registering and may need to carry a medical
//                         certificate.
//                     </p>
//                 </Collapsible>

//                 {/* 4 */}
//                 <Collapsible title="4. What if I feel unwell during the run?">
//                     <p className="text-left">
//                         Move to the side of the route and inform the nearest volunteer/medical team immediately.
//                     </p>
//                 </Collapsible>

//                 {/* 5 */}
//                 <Collapsible title="5. Are emergency contacts required?">
//                     <p className="text-left">
//                         Yes, you must provide an emergency contact during registration.
//                     </p>
//                 </Collapsible>
//             </section>


//             {/* Event Day Instructions */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Event Day Instructions</h2>

//                 {/* 1 */}
//                 <Collapsible title="1. What time should I arrive at the venue?">
//                     <p className="text-left">
//                         Reach at least 45–60 minutes before your reporting time.
//                     </p>
//                 </Collapsible>

//                 {/* 2 */}
//                 <Collapsible title="2. What should I carry on event day?">
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 space-y-1">
//                         <li>Bib number</li>
//                         <li>Valid ID</li>
//                         <li>Water bottle (optional)</li>
//                         <li>Energy gel (optional)</li>
//                         <li>Comfortable running shoes</li>
//                     </ul>
//                 </Collapsible>

//                 {/* 3 */}
//                 <Collapsible title="3. What if I forget my bib on event day?">
//                     <p className="text-left">
//                         Without a bib, you will not be allowed to run in the event.
//                     </p>
//                 </Collapsible>

//                 {/* 4 */}
//                 <Collapsible title="4. Will baggage counters be available?">
//                     <p className="text-left">
//                         Yes, baggage counters are available. However, organizers are not responsible for valuables.
//                     </p>
//                 </Collapsible>

//                 {/* 5 */}
//                 <Collapsible title="5. Can parents accompany their kids on route?">
//                     <p className="text-left">
//                         Only if a special Kids/Family run category allows it; otherwise, strictly no.
//                     </p>
//                 </Collapsible>
//             </section>

//             {/* CUT-OFF TIME TABLE */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Cut-off Time Table</h2>

//                 <div className="overflow-x-auto">
//                     <table className="w-full text-sm border-collapse">
//                         <thead>
//                             <tr className="bg-white/60">
//                                 <th className="p-3 border text-left">Category</th>
//                                 <th className="p-3 border text-left">Distance</th>
//                                 <th className="p-3 border text-left">Cut-off Time</th>
//                             </tr>
//                         </thead>

//                         <tbody>
//                             <tr>
//                                 <td className="p-3 border">Fun Run</td>
//                                 <td className="p-3 border">5 KM</td>
//                                 <td className="p-3 border">1 hour</td>
//                             </tr>
//                             <tr className="bg-white">
//                                 <td className="p-3 border">Short Run</td>
//                                 <td className="p-3 border">10 KM</td>
//                                 <td className="p-3 border">1 hr 45 mins</td>
//                             </tr>
//                             <tr>
//                                 <td className="p-3 border">Half Marathon</td>
//                                 <td className="p-3 border">21.1 KM</td>
//                                 <td className="p-3 border">3 hrs 30 mins</td>
//                             </tr>
//                             <tr className="bg-white">
//                                 <td className="p-3 border">Long Run</td>
//                                 <td className="p-3 border">35 KM</td>
//                                 <td className="p-3 border">5 hrs 30 mins</td>
//                             </tr>
//                             <tr>
//                                 <td className="p-3 border">Full Marathon</td>
//                                 <td className="p-3 border">42.2 KM</td>
//                                 <td className="p-3 border">6 hrs 30 mins</td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>

//                 <p className="mt-3 text-sm text-left text-slate-700">
//                     Important Notes:
//                     <br />● Runners missing cut-off may be asked to stop for safety.
//                     <br />● Hydration & medical support continue till official cut-off.
//                 </p>
//             </section>

//             {/* REFUND POLICY*/}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Refund Policy</h2>

//                 {/* 1 */}
//                 <Collapsible title="1. Are registration fees refundable?">
//                     <p className="text-left">
//                         No. All registration fees are strictly non-refundable, under all circumstances.
//                     </p>
//                 </Collapsible>

//                 {/* 2 */}
//                 <Collapsible title="2. Can I cancel my registration?">
//                     <p className="text-left">
//                         Registrations cannot be cancelled once payment is completed.
//                     </p>
//                 </Collapsible>

//                 {/* 3 */}
//                 <Collapsible title="3. Can I transfer my registration to someone else?">
//                     <p className="text-left">
//                         Yes, transfer may be allowed before the registration deadline.
//                         A nominal transfer fee may apply.
//                     </p>
//                 </Collapsible>

//                 {/* 4 */}
//                 <Collapsible title="4. Can I defer my registration to next year?">
//                     <p className="text-left">
//                         Deferral is only possible if the organizer officially announces a deferral window.
//                     </p>
//                 </Collapsible>

//                 {/* 5 */}
//                 <Collapsible title="5. What if the event gets postponed?">
//                     <p className="text-left">
//                         Your registration automatically moves to the new date. No refund is provided.
//                     </p>
//                 </Collapsible>
//             </section>

//             {/* TERMS & CONDITIONS */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Terms & Conditions</h2>

//                 {/* 1 */}
//                 <Collapsible title="1. Eligibility">
//                     <p className="text-left">
//                         Participants must meet the minimum age criteria defined for each category.
//                         <br />
//                         Minors must submit parent/guardian consent.
//                     </p>
//                 </Collapsible>

//                 {/* 2 */}
//                 <Collapsible title="2. Health & Medical Fitness">
//                     <p className="text-left">
//                         By registering, you confirm that you are medically fit to participate.
//                         <br />
//                         Organizer is not responsible for any health complications arising during or after the race.
//                     </p>
//                 </Collapsible>

//                 {/* 3 */}
//                 <Collapsible title="3. Bib & Timing Chip Usage">
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
//                         <li>Bib must be worn on the front of the chest</li>
//                         <li>Altering, exchanging, or misusing bibs will lead to disqualification</li>
//                         <li>Lost/damaged chips may result in “No timing recorded”</li>
//                     </ul>
//                 </Collapsible>

//                 {/* 4 */}
//                 <Collapsible title="4. Event Modifications">
//                     <p className="text-left">
//                         Organizers reserve the right to change routes, timings, event format, and categories based on safety or permissions.
//                     </p>
//                 </Collapsible>

//                 {/* 5 */}
//                 <Collapsible title="5. Photography & Videography Consent">
//                     <p className="text-left">
//                         By participating, you give the organizer the right to use event photos/videos for promotional purposes.
//                     </p>
//                 </Collapsible>

//                 {/* 6 */}
//                 <Collapsible title="6. Code of Conduct">
//                     <p className="text-left mb-2">Participants must follow:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
//                         <li>Safety instructions</li>
//                         <li>Route discipline</li>
//                         <li>Volunteer guidelines</li>
//                     </ul>
//                     <p className="text-left mt-2">Misconduct may result in disqualification.</p>
//                 </Collapsible>

//                 {/* 7 */}
//                 <Collapsible title="7. Liability Disclaimer">
//                     <p className="text-left">
//                         Organizer is not liable for injury, loss of property, or death caused by negligence, health issues, or accidents
//                         beyond organizational control.
//                     </p>
//                 </Collapsible>

//             </section>

//             {/* EVENT RULES & REGULATIONS */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Event Rules & Regulations</h2>

//                 {/* 1 */}
//                 <Collapsible title="1. Reporting & Flag-Off">
//                     <p className="text-left">
//                         Participants must report 45–60 minutes before their category’s start time.
//                     </p>
//                 </Collapsible>

//                 {/* 2 */}
//                 <Collapsible title="2. Mandatory Bib">
//                     <p className="text-left">
//                         Participation without an official bib is strictly prohibited.
//                     </p>
//                 </Collapsible>

//                 {/* 3 */}
//                 <Collapsible title="3. Time Limits">
//                     <p className="text-left">
//                         Participants must complete the race within the official cut-off.
//                     </p>
//                 </Collapsible>

//                 {/* 4 */}
//                 <Collapsible title="4. Hydration & Aid">
//                     <p className="text-left">Hydration stations are placed every 2–3 km.</p>
//                     <p className="text-left">Do not litter outside designated zones.</p>
//                 </Collapsible>

//                 {/* 5 */}
//                 <Collapsible title="5. Route Discipline">
//                     <p className="text-left">
//                         Participants must follow the marked route and marshal instructions.
//                     </p>
//                 </Collapsible>

//                 {/* 6 */}
//                 <Collapsible title="6. Prohibited Items">
//                     <p className="text-left mb-2">Not allowed on route:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
//                         <li>Pets</li>
//                         <li>Strollers</li>
//                         <li>Bicycles</li>
//                         <li>Skates</li>
//                         <li>Headphones (in certain segments for safety)</li>
//                         <li>Any wheeled device (unless authorized)</li>
//                     </ul>
//                 </Collapsible>

//                 {/* 7 */}
//                 <Collapsible title="7. Result Eligibility">
//                     <p className="text-left mb-2">Only runners who:</p>
//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
//                         <li>Start on time</li>
//                         <li>Wear official bib correctly</li>
//                         <li>Cross all timing mats are eligible for timing results & prizes.</li>
//                     </ul>
//                 </Collapsible>

//                 {/* 8 */}
//                 <Collapsible title="8. Medical Stoppage">
//                     <p className="text-left">
//                         Medical team has the authority to stop any participant for safety reasons.
//                     </p>
//                 </Collapsible>

//                 {/* 9 */}
//                 <Collapsible title="9. Baggage Counter Rules">
//                     <p className="text-left">
//                         Only bags with a proper tag will be accepted.
//                         <br />
//                         Organizer is not responsible for valuables.
//                     </p>
//                 </Collapsible>

//             </section>

//             {/* REGISTRATION EMAIL TEMPLATES */}
//             <section className="mb-10">
//                 <h2 className="text-2xl font-semibold text-center mb-6">Registration Email Templates</h2>

//                 {/* 1 */}
//                 <Collapsible title="1. Registration Confirmation Email">
//                     <p className="text-left">Subject: Your Registration for the LOKRAJA Marathon is Confirmed!</p>

//                     <p className="text-left mt-2">Hi (name),</p>

//                     <p className="text-left mt-2">
//                         Congratulations! Your registration for the LOKRAJA Marathon – (city) is successfully completed.
//                     </p>

//                     <p className="text-left mt-3">Your Registration Details:</p>

//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1 mt-2">
//                         <li>Category: {"{{category}}"}</li>
//                         <li>Bib No.: Will be shared before the event</li>
//                         <li>Event Date: {"{{event_date}}"}</li>
//                         <li>Reporting Time: {"{{reporting_time}}"}</li>
//                         <li>Location: {"{{event_location}}"}</li>

//                     </ul>

//                     <p className="text-left mt-3">What’s Next?</p>

//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1 mt-2">
//                         <li>You will receive expo/bib collection details closer to the event</li>
//                         <li>Keep the confirmation email safe</li>
//                         <li>Follow our Instagram page for real-time updates</li>
//                     </ul>

//                     <p className="text-left mt-3">See you at the start line!</p>
//                     <p className="text-left">Team Sprints Saga India</p>
//                 </Collapsible>

//                 {/* 2 */}
//                 <Collapsible title="2. Bib Collection Email">
//                     <p className="text-left">Subject: Your Bib Collection Details – LOKRAJA Marathon</p>

//                     <p className="text-left mt-2">Hi (name),</p>

//                     <p className="text-left mt-2">Your bib and race kit are ready for pickup.</p>

//                     <p className="text-left mt-3">Expo/Bib Collection Details:</p>

//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1 mt-2">
//                         <li>Date: {"{{expo_date}}"}</li>
//                         <li>Time: {"{{expo_time}}"}</li>
//                         <li>Venue: {"{{expo_venue}}"}</li>

//                         <li>Documents Required:</li>
//                         <ul className="list-disc list-inside ml-5 space-y-1 text-sm">
//                             <li>This confirmation email</li>
//                             <li>Valid ID Proof</li>
//                         </ul>
//                     </ul>

//                     <p className="text-left mt-3">No bibs will be issued on event day.</p>

//                     <p className="text-left mt-2">Regards,</p>
//                     <p className="text-left">Team Sprints Saga India</p>
//                 </Collapsible>

//                 {/* 3 */}
//                 <Collapsible title="3. Event Day Instructions Email">
//                     <p className="text-left">Subject: Important Instructions for Event Day – Please Read</p>

//                     <p className="text-left mt-2">Hi (name),</p>

//                     <p className="text-left mt-2">
//                         We’re excited to welcome you to the LOKRAJA Marathon – (city).
//                     </p>

//                     <p className="text-left mt-3">Event Day Guidelines:</p>

//                     <ul className="list-disc list-inside text-left text-sm text-slate-700 mt-2 space-y-1">
//                         <li>Reporting Time: {"{{ reporting_time }}"}</li>
//                         <li>Flag-Off Time: {"{{ flagoff_time }}"}</li>
//                         <li>Venue: {"{{ event_location }}"}</li>
//                         <li>Wear your bib on the front</li>
//                         <li>Stay hydrated and run safe</li>
//                     </ul>

//                     <p className="text-left mt-3">Looking forward to hosting you!</p>
//                     <p className="text-left">Team Sprints Saga India</p>
//                 </Collapsible>

//                 {/* 4 */}
//                 <Collapsible title="4. Results Upload Email">
//                     <p className="text-left">Subject: Your LOKRAJA Marathon Results Are Live!</p>

//                     <p className="text-left mt-2">Hi (name),</p>

//                     <p className="text-left mt-2">Your race results are now available.</p>

//                     <p className="text-left mt-2">Click below to view:</p>
//                     <p className="text-left">{"{{ results_link }}"}</p>

//                     <p className="text-left mt-2">Photos will be uploaded within 48–72 hours.</p>

//                     <p className="text-left mt-3">Congratulations on your achievement!</p>

//                     <p className="text-left">Team Sprints Saga India</p>
//                 </Collapsible>

//             </section>

            
//             {/* Contact & Templates */}
//             <section className="mb-10">
//   <h2 className="text-2xl font-semibold text-center mb-6">Contact Us</h2>

//   <div className="grid md:grid-cols-2 gap-6">

//     {/* LEFT SIDE — Contact + Get In Touch DESCRIPTION */}
//     <div className="p-4 border rounded-lg bg-white">

//       <p className="font-medium mb-2">Contact Us</p>

//       <p className="text-left mb-3">
//         For any queries, support requests, or partnership opportunities, feel free to reach us through the details below.
//       </p>

//       {/* Phone */}
//       <p className="font-medium">Phone Support</p>
//       <p className="text-sm text-slate-700">+91 9987190415 / 9967707306</p>
//       <p className="text-sm text-slate-700 mb-4">
//         (Available 10:00 AM to 6:00 PM, Monday to Saturday)
//       </p>

//       {/* Email */}
//       <p className="font-medium">Email Support</p>
//       <p className="text-sm text-slate-700">support@sprintssagaindia.com</p>
//       <p className="text-sm text-slate-700">events@sprintssagaindia.com</p>
//       <p className="text-sm text-slate-700 mb-4">
//         (You can provide 1 or 2 emails, I left them editable)
//       </p>

//       {/* Response Time */}
//       <p className="font-medium">Response Time</p>
//       <p className="text-sm text-slate-700 mb-4">
//         We typically respond within 24–48 hours.
//       </p>

//       {/* Social Media */}
//       <p className="font-medium">Social Media</p>
//       <ul className="list-disc list-inside text-sm text-slate-700 space-y-1 mt-2 mb-6">
//         <li>Instagram: @sprintssagaindia</li>
//         <li>Facebook: Sprints Saga India</li>
//       </ul>

//       {/* MOVE GET IN TOUCH TEXT HERE */}
//       <p className="font-medium mb-3">Get In Touch</p>

//       <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
//         <li>Full Name</li>
//         <li>Email Address</li>
//         <li>Phone Number</li>
//         <li>Select Category (General Query / Registration / Sponsorship / Volunteer)</li>
//         <li>Message Box</li>
//         <li>Submit Button</li>
//       </ul>

//     </div>

//     {/* RIGHT SIDE — FORM ONLY */}
//     <div className="p-4 border rounded-lg bg-white">

//       <form
//         onSubmit={(e) => {
//           e.preventDefault();
//           alert("Message submitted (placeholder). Integrate with your contact API.");
//         }}
//         className="space-y-3"
//       >
//         <input className="w-full p-2 border rounded" placeholder="Full Name" required />
//         <input className="w-full p-2 border rounded" placeholder="Email Address" type="email" required />
//         <input className="w-full p-2 border rounded" placeholder="Phone Number" />

//         <select className="w-full p-2 border rounded">
//           <option>General Query</option>
//           <option>Registration</option>
//           <option>Sponsorship</option>
//           <option>Volunteer</option>
//         </select>

//         <textarea className="w-full p-2 border rounded" rows="4" placeholder="Message" required />

//         <button
//           type="submit"
//           className="w-full py-2 rounded text-white"
//           style={{ background: "linear-gradient(90deg,#05c6d7,#0c9aa3)" }}
//         >
//           Submit
//         </button>
//       </form>

//     </div>

//   </div>
// </section>

//         </div>
//     );
// }



// src/FAQs.jsx
import React, { useState } from "react";

const Collapsible = ({ title, children }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="mb-4 border rounded-lg overflow-hidden">
            <button
                onClick={() => setOpen((s) => !s)}
                className="w-full text-left px-4 py-3 flex justify-between items-center bg-white"
            >
                <span className="font-medium">{title}</span>
                <span className="text-sm text-slate-500">{open ? "−" : "+"}</span>
            </button>
            {open && (
                <div className="px-4 py-4 bg-slate-50 text-left">
                    {children}
                </div>
            )}
        </div>
    );
};

export default function FAQs() {
    return (
        <div className="max-w-5xl mx-auto py-12 px-4">
            <h1 className="text-4xl font-extrabold text-center mb-6">Frequently Asked Questions</h1>

            {/* General */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">General FAQs</h2>

                <Collapsible title="Can I change my T-shirt size?">
                    <p className="mb-2 text-left">
                        Yes — T-shirt size can be changed within 14 days of registration or until registrations close.
                        <br />
                        After bib allocation, size changes will not be allowed.
                    </p>
                </Collapsible>

                <Collapsible title="Can I change my race category?">
                    <p className="mb-3 text-left">Yes, race category changes are allowed before the registration deadline.</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
                        <li>Upgrades require additional payment.</li>
                        <li>Downgrades are allowed, but the fee difference is non-refundable.</li>
                    </ul>
                </Collapsible>

                <Collapsible title="Can I transfer my registration to someone else?">
                    <p className="text-left">Yes, registration transfer is allowed before registration closes.</p>
                    <p className="text-left">A nominal transfer processing fee may apply. Transfers are allowed before registrations close.</p>
                </Collapsible>

                <Collapsible title="What if I miss the cut-off time?">
                    <p className="text-left">If you miss the official cut-off time:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
                        <li>Your timing will not count for ranking.</li>
                        <li>You may still complete the run at your own pace.</li>
                    </ul>
                </Collapsible>

                <Collapsible title="What is included in the race kit?">
                    <p className="text-left mb-2">Race kit includes:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
                        <li>Bib with timing chip</li>
                        <li>Event T-shirt</li>
                        <li>Safety pins / fasteners</li>
                        <li>Route map</li>
                        <li>Event instructions</li>
                        <li>Sponsor coupons (if applicable)</li>
                    </ul>
                </Collapsible>

                <Collapsible title="When and where is the expo/bib collection?">
                    <p className="text-left">
                        Expo/Bib Collection details will be shared closer to the event date on the website and via email/SMS.
                        <br />
                        Usually held 1–2 days before the event.
                    </p>
                </Collapsible>

                <Collapsible title="Will there be hydration points?">
                    <p className="text-left">Yes, hydration stations will be placed every 2–3 km across all routes.</p>
                    <br />
                    <p className="text-left">Stations will include:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
                        <li>Water</li>
                        <li>Electrolytes</li>
                        <li>Basic medical support</li>
                    </ul>
                </Collapsible>

                <Collapsible title="Will medical aid be available?">
                    <p className="text-left">Yes, medical support will be available at multiple points:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
                        <li>Medical tents</li>
                        <li>On-route first-aid teams</li>
                        <li>Ambulances</li>
                        <li>Finish line medical zone</li>
                    </ul>
                </Collapsible>

                <Collapsible title="Are pets or strollers allowed at the event?">
                    <p className="text-left">No, pets are not allowed for safety reasons.</p>
                </Collapsible>

                <Collapsible title="Are strollers allowed?">
                    <p className="text-left">No, strollers/prams/bicycles/wheeled devices are not permitted on the run route.
                    </p>
                </Collapsible>

                <Collapsible title="Can children participate?">
                    <p className="text-left">
                        Yes — children can participate in age-appropriate categories (if available). <br />
                        Participants under 16 must submit parent/guardian consent and valid age proof.
                    </p>

                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
                        <li>Parent/guardian consent</li>
                        <li>Valid age proof</li>
                    </ul>

                </Collapsible>

                <Collapsible title="What are the prize categories?">
                    <p className="text-left">
                        Prize categories include:
                    </p>

                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
                        <li>Overall winners</li>
                        <li>Age-group categories</li>
                        <li>Male & Female categories</li>
                    </ul>
                </Collapsible>

                <Collapsible title="What documents are required?">
                    <p className="text-left">
                        Documents required include:
                    </p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
                        <li>Valid Government ID</li>
                        <li>Age proof</li>
                        <li>Medical certificate (if required)</li>
                        <li>Consent form (for minors)</li>
                    </ul>
                </Collapsible>

                <Collapsible title="When will the results be available?">
                    <p className="text-left font-bold">Podium Results (Winners Announcement)</p>
                    <p className="text-left">Podium finishers for each category (Overall Men & Women) will be announced immediately after the race at the
                        event venue.</p>
                    <br />
                    <p className="text-left font-bold">Official Timing Results (All Participants)</p>
                    <p className="text-left">Official race results for all participants will be uploaded on the website within 24–48 hours after the event.
                        <br />
                        Runners will also receive an email/SMS notification once results are live.</p>

                </Collapsible>

                <Collapsible title="How can I download my photos?">
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 marker:text-slate-400 space-y-1">
                        <li>Event photos will be available within 24-48hours after the event.</li>
                        <li>You can search and download using your bib number.</li>
                    </ul>
                </Collapsible>
            </section>

            {/* Refund / Cancellation */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Refund & Cancellation</h2>

                {/* 16 */}
                <Collapsible title="Can I get a refund if I cannot participate?">
                    <p className="text-left">
                        In case the event is cancelled due to force majeure reasons (weather, government orders, natural disaster,
                        safety issues, or any emergency beyond organizer control), the following options may be offered to registered participants:
                    </p>

                    <ol className="list-decimal list-inside text-left text-sm text-slate-700 mt-3 space-y-2">
                        <li>
                            <strong>Deferral Option</strong>
                            <div className="ml-4">Your registration may be automatically shifted to the next scheduled edition of the event.</div>
                        </li>

                        <li>
                            <strong>Transfer Option</strong>
                            <div className="ml-4">You may be allowed to transfer your registration to another city/event of Sprints Saga India (subject to availability).</div>
                        </li>

                        <li>
                            <strong>Partial Refund Policy (Based on Event Proximity)</strong>
                            <div className="ml-4">If the organizer decides to offer a refund, it will be processed as per the following percentage-slab system:</div>
                        </li>
                    </ol>

                    {/* Refund Table */}
                    <div className="overflow-x-auto mt-4">
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="bg-white/60">
                                    <th className="p-3 border text-left">Days Remaining Before Event</th>
                                    <th className="p-3 border text-left">Refund Eligibility</th>
                                </tr>
                            </thead>

                            <tbody>
                                <tr>
                                    <td className="p-3 border">More than 90 days</td>
                                    <td className="p-3 border">70% refund</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="p-3 border">60–90 days</td>
                                    <td className="p-3 border">50% refund</td>
                                </tr>
                                <tr>
                                    <td className="p-3 border">30–60 days</td>
                                    <td className="p-3 border">30% refund</td>
                                </tr>
                                <tr className="bg-white">
                                    <td className="p-3 border">Less than 30 days</td>
                                    <td className="p-3 border">0% refund (No refund – only deferral)</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    {/* Notes */}
                    <p className="font-medium mt-4">Note:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
                        <li>Processing fee / payment gateway charges are non-refundable.</li>
                        <li>Refund amount will be credited within 7–14 working days.</li>
                        <li>Refund policy applies only if the organizer officially announces refunds.</li>
                        <li>Merchandise/add-ons are non-refundable.</li>
                    </ul>
                </Collapsible>

                {/* 17 */}
                <Collapsible title="What are the reporting times?">
                    <p className="text-left">
                        Reporting times will be mentioned in your confirmation email and on the event page.
                        Each category has a different reporting &amp; flag-off time.
                    </p>
                </Collapsible>

                {/* 18 */}
                <Collapsible title="Is baggage allowed?">
                    <p className="text-left">
                        Yes, baggage storage will be available.
                        However, the organizer is not responsible for any loss or damage.
                    </p>
                </Collapsible>

                {/* 19 */}
                <Collapsible title="Is parking available at the venue?">
                    <p className="text-left">
                        Limited parking may be available.
                        Participants are encouraged to carpool or use public transport.
                    </p>
                </Collapsible>

                {/* 20 */}
                <Collapsible title="Will the route map be shared?">
                    <p className="text-left">
                        Yes, the official route map will be uploaded on the website and emailed before the event.
                    </p>
                </Collapsible>
            </section>


            {/* Registration */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Registration FAQs</h2>

                <Collapsible title="How can I register for the event?">
                    <p className="text-left">You can register online through the official event website. Select your category, fill in your details, and complete the
                        payment process.
                    </p>
                </Collapsible>

                <Collapsible title="Do I need to create an account to register?">
                    <p className="text-left">Yes, registration can be completed creating an account. Your confirmation and updates will be sent to your
                        email/SMS.
                    </p>
                </Collapsible>

                <Collapsible title="What payment methods are accepted?">
                    <p className="text-left font-bold">We accept:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
                        <li>UPI</li>
                        <li>Debit/Credit Cards</li>
                        <li>Net Banking</li>
                        <li>Wallets</li>
                    </ul>
                </Collapsible>

                <Collapsible title="Will I get a confirmation after registering?">
                    <p className="text-left font-bold">Yes, you will receive:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
                        <li>Email confirmation</li>
                        <li>SMS confirmation</li>
                        <li>Unique registration ID</li>
                    </ul>
                </Collapsible>

                <Collapsible title="Can I register on the event day?">
                    <p className="text-left">No, on-spot registrations are not allowed. You must register before the deadline.
                    </p>
                </Collapsible>

                <Collapsible title="Is group or corporate registration available?">
                    <p className="text-left">Yes, group/corporate registrations are available. Contact the event team for bulk entry support.
                    </p>
                </Collapsible>
            </section>

            {/* Timing Chip */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Timing Chip FAQs</h2>

                {/* 1 */}
                <Collapsible title="1. What is a timing chip?">
                    <p className="text-left">
                        It is an electronic sensor attached to your bib number that tracks your official race time.
                    </p>
                </Collapsible>

                {/* 2 */}
                <Collapsible title="2. How does the timing chip work?">
                    <p className="text-left mb-2">The chip records your time when you cross:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
                        <li>Start line</li>
                        <li>Timing mats on the route</li>
                        <li>Finish line</li>
                    </ul>
                </Collapsible>

                {/* 3 */}
                <Collapsible title="3. Do all categories get a timing chip?">
                    <p className="text-left">
                        Only timed competitive categories get timing chips.
                        Fun run/walk categories may not include timing.
                    </p>
                </Collapsible>

                {/* 4 */}
                <Collapsible title="4. What if my timing chip doesn’t work?">
                    <p className="text-left">
                        If your chip is damaged or not detected, your timing may not be recorded.
                        Please handle the bib carefully.
                    </p>
                </Collapsible>

                {/* 5 */}
                <Collapsible title="5. Where should I wear my bib?">
                    <p className="text-left">
                        Wear your bib on the front of your T-shirt, visible and unobstructed, to ensure proper timing.
                    </p>
                </Collapsible>
            </section>

            {/* Safety & Medical */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Safety & Medical</h2>

                {/* 1 */}
                <Collapsible title="1. Is the event safe for all participants?">
                    <p className="text-left">
                        Yes. Safety is our highest priority and proper arrangements are provided on the route and venue.
                    </p>
                </Collapsible>

                {/* 2 */}
                <Collapsible title="2. Will there be medical support?">
                    <p className="text-left mb-2">Yes, full medical support includes:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
                        <li>Ambulances</li>
                        <li>Medical tents</li>
                        <li>First-aid stations</li>
                        <li>On-ground medical volunteers</li>
                    </ul>
                </Collapsible>

                {/* 3 */}
                <Collapsible title="3. Can I run if I have a medical condition?">
                    <p className="text-left">
                        Participants with medical conditions must consult a doctor before registering and may need to carry a medical
                        certificate.
                    </p>
                </Collapsible>

                {/* 4 */}
                <Collapsible title="4. What if I feel unwell during the run?">
                    <p className="text-left">
                        Move to the side of the route and inform the nearest volunteer/medical team immediately.
                    </p>
                </Collapsible>

                {/* 5 */}
                <Collapsible title="5. Are emergency contacts required?">
                    <p className="text-left">
                        Yes, you must provide an emergency contact during registration.
                    </p>
                </Collapsible>
            </section>

            {/* Event Day Instructions */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Event Day Instructions</h2>

                {/* 1 */}
                <Collapsible title="1. What time should I arrive at the venue?">
                    <p className="text-left">
                        Reach at least 45–60 minutes before your reporting time.
                    </p>
                </Collapsible>

                {/* 2 */}
                <Collapsible title="2. What should I carry on event day?">
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 pl-2 space-y-1">
                        <li>Bib number</li>
                        <li>Valid ID</li>
                        <li>Water bottle (optional)</li>
                        <li>Energy gel (optional)</li>
                        <li>Comfortable running shoes</li>
                    </ul>
                </Collapsible>

                {/* 3 */}
                <Collapsible title="3. What if I forget my bib on event day?">
                    <p className="text-left">
                        Without a bib, you will not be allowed to run in the event.
                    </p>
                </Collapsible>

                {/* 4 */}
                <Collapsible title="4. Will baggage counters be available?">
                    <p className="text-left">
                        Yes, baggage counters are available. However, organizers are not responsible for valuables.
                    </p>
                </Collapsible>

                {/* 5 */}
                <Collapsible title="5. Can parents accompany their kids on route?">
                    <p className="text-left">
                        Only if a special Kids/Family run category allows it; otherwise, strictly no.
                    </p>
                </Collapsible>
            </section>

            {/* CUT-OFF TIME TABLE */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Cut-off Time Table</h2>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-white/60">
                                <th className="p-3 border text-left">Category</th>
                                <th className="p-3 border text-left">Distance</th>
                                <th className="p-3 border text-left">Cut-off Time</th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr>
                                <td className="p-3 border">Fun Run</td>
                                <td className="p-3 border">5 KM</td>
                                <td className="p-3 border">1 hour</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="p-3 border">Short Run</td>
                                <td className="p-3 border">10 KM</td>
                                <td className="p-3 border">1 hr 45 mins</td>
                            </tr>
                            <tr>
                                <td className="p-3 border">Half Marathon</td>
                                <td className="p-3 border">21.1 KM</td>
                                <td className="p-3 border">3 hrs 30 mins</td>
                            </tr>
                            <tr className="bg-white">
                                <td className="p-3 border">Long Run</td>
                                <td className="p-3 border">35 KM</td>
                                <td className="p-3 border">5 hrs 30 mins</td>
                            </tr>
                            <tr>
                                <td className="p-3 border">Full Marathon</td>
                                <td className="p-3 border">42.2 KM</td>
                                <td className="p-3 border">6 hrs 30 mins</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <p className="mt-3 text-sm text-left text-slate-700">
                    Important Notes:
                    <br />● Runners missing cut-off may be asked to stop for safety.
                    <br />● Hydration & medical support continue till official cut-off.
                </p>
            </section>

            {/* REFUND POLICY*/}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Refund Policy</h2>

                {/* 1 */}
                <Collapsible title="1. Are registration fees refundable?">
                    <p className="text-left">
                        No. All registration fees are strictly non-refundable, under all circumstances.
                    </p>
                </Collapsible>

                {/* 2 */}
                <Collapsible title="2. Can I cancel my registration?">
                    <p className="text-left">
                        Registrations cannot be cancelled once payment is completed.
                    </p>
                </Collapsible>

                {/* 3 */}
                <Collapsible title="3. Can I transfer my registration to someone else?">
                    <p className="text-left">
                        Yes, transfer may be allowed before the registration deadline.
                        A nominal transfer fee may apply.
                    </p>
                </Collapsible>

                {/* 4 */}
                <Collapsible title="4. Can I defer my registration to next year?">
                    <p className="text-left">
                        Deferral is only possible if the organizer officially announces a deferral window.
                    </p>
                </Collapsible>

                {/* 5 */}
                <Collapsible title="5. What if the event gets postponed?">
                    <p className="text-left">
                        Your registration automatically moves to the new date. No refund is provided.
                    </p>
                </Collapsible>
            </section>

            {/* TERMS & CONDITIONS */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Terms & Conditions</h2>

                {/* 1 */}
                <Collapsible title="1. Eligibility">
                    <p className="text-left">
                        Participants must meet the minimum age criteria defined for each category.
                        <br />
                        Minors must submit parent/guardian consent.
                    </p>
                </Collapsible>

                {/* 2 */}
                <Collapsible title="2. Health & Medical Fitness">
                    <p className="text-left">
                        By registering, you confirm that you are medically fit to participate.
                        <br />
                        Organizer is not responsible for any health complications arising during or after the race.
                    </p>
                </Collapsible>

                {/* 3 */}
                <Collapsible title="3. Bib & Timing Chip Usage">
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
                        <li>Bib must be worn on the front of the chest</li>
                        <li>Altering, exchanging, or misusing bibs will lead to disqualification</li>
                        <li>Lost/damaged chips may result in “No timing recorded”</li>
                    </ul>
                </Collapsible>

                {/* 4 */}
                <Collapsible title="4. Event Modifications">
                    <p className="text-left">
                        Organizers reserve the right to change routes, timings, event format, and categories based on safety or permissions.
                    </p>
                </Collapsible>

                {/* 5 */}
                <Collapsible title="5. Photography & Videography Consent">
                    <p className="text-left">
                        By participating, you give the organizer the right to use event photos/videos for promotional purposes.
                    </p>
                </Collapsible>

                {/* 6 */}
                <Collapsible title="6. Code of Conduct">
                    <p className="text-left mb-2">Participants must follow:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
                        <li>Safety instructions</li>
                        <li>Route discipline</li>
                        <li>Volunteer guidelines</li>
                    </ul>
                    <p className="text-left mt-2">Misconduct may result in disqualification.</p>
                </Collapsible>

                {/* 7 */}
                <Collapsible title="7. Liability Disclaimer">
                    <p className="text-left">
                        Organizer is not liable for injury, loss of property, or death caused by negligence, health issues, or accidents
                        beyond organizational control.
                    </p>
                </Collapsible>

            </section>

            {/* EVENT RULES & REGULATIONS */}
            <section className="mb-10">
                <h2 className="text-2xl font-semibold text-center mb-6">Event Rules & Regulations</h2>

                {/* 1 */}
                <Collapsible title="1. Reporting & Flag-Off">
                    <p className="text-left">
                        Participants must report 45–60 minutes before their category’s start time.
                    </p>
                </Collapsible>

                {/* 2 */}
                <Collapsible title="2. Mandatory Bib">
                    <p className="text-left">
                        Participation without an official bib is strictly prohibited.
                    </p>
                </Collapsible>

                {/* 3 */}
                <Collapsible title="3. Time Limits">
                    <p className="text-left">
                        Participants must complete the race within the official cut-off.
                    </p>
                </Collapsible>

                {/* 4 */}
                <Collapsible title="4. Hydration & Aid">
                    <p className="text-left">Hydration stations are placed every 2–3 km.</p>
                    <p className="text-left">Do not litter outside designated zones.</p>
                </Collapsible>

                {/* 5 */}
                <Collapsible title="5. Route Discipline">
                    <p className="text-left">
                        Participants must follow the marked route and marshal instructions.
                    </p>
                </Collapsible>

                {/* 6 */}
                <Collapsible title="6. Prohibited Items">
                    <p className="text-left mb-2">Not allowed on route:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
                        <li>Pets</li>
                        <li>Strollers</li>
                        <li>Bicycles</li>
                        <li>Skates</li>
                        <li>Headphones (in certain segments for safety)</li>
                        <li>Any wheeled device (unless authorized)</li>
                    </ul>
                </Collapsible>

                {/* 7 */}
                <Collapsible title="7. Result Eligibility">
                    <p className="text-left mb-2">Only runners who:</p>
                    <ul className="list-disc list-inside text-left text-sm text-slate-700 space-y-1">
                        <li>Start on time</li>
                        <li>Wear official bib correctly</li>
                        <li>Cross all timing mats are eligible for timing results & prizes.</li>
                    </ul>
                </Collapsible>

                {/* 8 */}
                <Collapsible title="8. Medical Stoppage">
                    <p className="text-left">
                        Medical team has the authority to stop any participant for safety reasons.
                    </p>
                </Collapsible>

                {/* 9 */}
                <Collapsible title="9. Baggage Counter Rules">
                    <p className="text-left">
                        Only bags with a proper tag will be accepted.
                        <br />
                        Organizer is not responsible for valuables.
                    </p>
                </Collapsible>

            </section>
{/* down the component registration */}
            {/* REGISTRATION EMAIL TEMPLATES */}
           

            
            {/* Contact & Templates */}...
        </div>
    );
}
