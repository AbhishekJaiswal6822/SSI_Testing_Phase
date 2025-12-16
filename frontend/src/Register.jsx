
// C:\Users\abhis\OneDrive\Desktop\SOFTWARE_DEVELOPER_LEARNING\marathon_project\frontend\src\Register.jsx - FINAL VERSION (GROUP CRASH FIXED)

import React, { useState } from "react";
import { RACE_PRICING } from "./constants/racePricing";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { api } from "./api"; 
import { useAuth } from "./AuthProvider"; 

// --- CONFIGURATION CONSTANTS ---
const PG_FEE_RATE = 0.021; // 2.1% Payment Gateway Fee
const GST_RATE = 0.18;    // 18% GST (Applied only to PG Fee)
// Get today's date in YYYY-MM-DD format for max DOB constraint
const today = new Date().toISOString().split('T')[0];

// Helper function for rounding to two decimal places
const roundToTwoDecimal = (num) => Math.round(num * 100) / 100;

// --- INPUT HANDLERS FOR ENFORCEMENT ---
// 1. Enforce letters, spaces, hyphens, and apostrophes (for Names)
const handleNameKeyPress = (event) => {
    // Regex for letters, spaces, hyphens, apostrophes (prevents numbers/symbols)
    const regex = /^[a-zA-Z\s'-]+$/;
    // Check if the pressed key is NOT allowed
    if (event.key.length === 1 && !regex.test(event.key)) {
        event.preventDefault();
    }
    // Allow non-character keys (e.g., Backspace, Delete, Arrow keys, etc.)
};

// 2. Enforce only digits (for Phone/Pincode)
const handleNumberKeyPress = (event) => {
    // Regex for digits (0-9)
    if (!/[0-9]/.test(event.key)) {
        event.preventDefault();
    }
};
// --- END INPUT HANDLERS ---

// --- DATA STRUCTURE ---
const sizeChartData = {
    XS: { Male: 36, Female: 34 },
    S: { Male: 38, Female: 36 },
    M: { Male: 40, Female: 38 },
    L: { Male: 42, Female: 40 },
    XL: { Male: 44, Female: 42 },
    XXL: { Male: 46, Female: 44 },
    XXXL: { Male: 48, Female: 46 },
};

// Helper function to get filtered sizes based on selected gender
const getFilteredSizes = (gender) => {
    const genderKey = (gender === 'Female') ? 'Female' : 'Male';
    return Object.keys(sizeChartData).map(size => {
        const chest = sizeChartData[size][genderKey];
        return { size: size, label: `${size} (${chest} in)`, value: size };
    });
};

// --- PLATFORM FEE CONFIGURATION ---
const getPlatformFee = (raceId) => {
    switch (raceId) {
        case "5k":
            return 25; 
        case "10k":
            return 30; 
        case "half": 
            return 40; 
        case "35k":
        case "full": 
            return 50; 
        default:
            return 0;
    }
};

const raceCategories = [
    { id: "5k", name: "5K Fun Run", description: "Perfect for beginners", regularPrice: 1200, prebookPrice: 1000, charityFee: 1600 },
    { id: "10k", name: "10K Challenge", description: "Step up your game", regularPrice: 1700, prebookPrice: 1500, charityFee: 2500 },
    { id: "half", name: "Half Marathon (21.097K)", description: "The classic distance (21.1K)", regularPrice: 2500, prebookPrice: 2200, charityFee: 2800 },
    { id: "35k", name: "35K Ultra", description: "Push your limits", regularPrice: 2700, prebookPrice: 2500, charityFee: 3500 },
    { id: "full", name: "Full Marathon (42K)", description: "The ultimate challenge", regularPrice: 3000, prebookPrice: 2700, charityFee: 4000 }
];

const charityOptions = [
    { id: "charityA", name: "Educate Maharashtra Foundation" },
    { id: "charityB", name: "Clean River Initiative" },
    { id: "charityC", name: "Healthcare for Elderly" },
];

const causeOptions = [
    "Education", "Health", "Environment", "Women Empowerment", "Animal Welfare",
];

const idOptions = ["Aadhaar Card", "PAN Card", "Passport"];

// Standard constants
const genders = ["Male", "Female", "Other"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-","other"];
const statesInIndia = [
    "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana",
    "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur",
    "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
    "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
];
const nationalitiesISO = [
    "Afghan", "Albanian", "Algerian", "American", "Andorran", "Angolan", "Argentine", "Armenian", "Australian", "Austrian", "Azerbaijani", "Bangladeshi", "Belarusian", "Belgian", "Bhutanese", "Bolivian", "Brazilian", "British", "Bulgarian", "Cambodian", "Cameroonian", "Canadian", "Chilean", "Chinese", "Colombian", "Costa Rican", "Croatian", "Cuban", "Cypriot", "Czech", "Danish", "Dominican", "Dutch", "Egyptian", "Emirati", "Estonian", "Ethiopian", "Finnish", "French", "Georgian", "German", "Greek", "Hungarian", "Icelandic", "Indian", "Indonesian", "Iranian", "Iraqi", "Irish", "Israeli", "Italian", "Japanese", "Jordanian", "Kenyan", "Kuwaiti", "Latvian", "Lebanese", "Lithuanian", "Luxembourgish", "Malaysian", "Mexican", "Mongolian", "Moroccan", "Nepalese", "New Zealander", "Nigerian", "Norwegian", "Omani", "Pakistani", "Peruvian", "Philippine", "Polish", "Portuguese", "Qatari", "Romanian", "Russian", "Saudi Arabian", "Singaporean", "Slovak", "Slovenian", "South African", "South Korean", "Spanish", "Sri Lankan", "Swedish", "Swiss", "Thai", "Turkish", "Ukrainian", "Uruguayan", "Vietnamese", "Zambian", "Zimbabwean"
];

// --- T-Shirt Size Chart Popover Component (MOBILE STYLING FIXED) ---
const TShirtSizePopover = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div 
            // FIX: Uses absolute positioning relative to its parent container (which needs position-relative)
            // On mobile (default), it sits below the input (top-full, left-0, w-full relative to container)
            // On md screens, it shifts to the right (md:left-full, md:ml-4, md:w-[300px])
            className="absolute top-full left-0 mt-2 z-40 p-4 bg-white border border-slate-200 rounded-lg shadow-lg max-w-[90vw] w-full md:left-full md:ml-4 md:max-w-sm md:w-[300px]"
        >
            <h4 className="font-semibold text-slate-900 mb-2 border-b pb-1 flex justify-between items-center">
                T-Shirt Size Chart
                <button onClick={onClose} className="text-slate-500 hover:text-slate-800 text-lg" aria-label="Close chart">
                    <AiOutlineClose className="h-4 w-4"/>
                </button>
            </h4> 
            <img 
                src={"/src/assets/tshirt-size.jpeg"} 
                alt="T-shirt size chart" 
                className="w-full h-auto rounded"
            />
            <p className="mt-2 text-xs text-slate-600">
                *Sizes are chest measurements (in inches).
            </p>
        </div>
    );
};
// --- END T-Shirt Size Chart Popover Component ---

// --- ID Upload Block Component (Reusable - Unchanged) ---
const IdUploadBlock = ({ idType, idNumber, idFile, handleTypeChange, handleNumberChange, handleFileChange, sectionId }) => (
    <>
        <div className="md:col-span-2">
            <h4 className="text-md font-semibold text-slate-800 mt-4 mb-2 border-t pt-4">National Identity Card Upload *</h4>
        </div>

       <div>
    <label className="block text-sm font-medium text-slate-700 mb-1">ID Proof Type *</label>
    <select 
        value={idType} 
        onChange={(e) => handleTypeChange('idType', e.target.value)}
        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" 
        required
    >
        <option value="">Select ID Type</option>
        {idOptions.map((id) => <option key={id} value={id}>{id}</option>)}
    </select> 
</div>

        <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">ID Number *</label>
            <input 
                type="text" 
                value={idNumber}
                onChange={(e) => handleNumberChange('idNumber', e.target.value)}
                placeholder="Enter your national identity number"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                required
            />
        </div>
        
        <div className="md:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-1">Upload Document *</label>
            <input 
                type="file" 
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={(e) => handleFileChange('idFile', e.target.files[0])}
                className="w-full rounded-xl border border-slate-200 px-3 py-1.5 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 file:mr-4 file:py-1 file:px-2 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-teal-50 file:text-teal-700 hover:file:bg-teal-100"
                required
            />
            {idFile && <p className="text-xs text-green-600 mt-1">File Selected: {idFile.name}</p>}
        </div>
    </>
);
// --- END ID Upload Block Component ---


function Register() {
    // Use the 10K prebook price for default calculation if needed
    const defaultRace = raceCategories.find(r => r.id === '10k'); 
    const { token, user } = useAuth(); 

    const [registrationType, setRegistrationType] = useState("individual");
    
    // --- Race Selection State ---
    const [selectedRace, setSelectedRace] = useState(null); 

    // --- MODIFIED STATE FOR POPOVER (Unchanged) ---
    const [openPopoverId, setOpenPopoverId] = useState(null); 
    const toggleSizeChart = (id) => {
        setOpenPopoverId(prevId => prevId === id ? null : id);
    };
    // --- END MODIFIED STATE FOR POPOVER ---

    // --- Charity Participant State (Unchanged) ---
    const [charityParticipant, setCharityParticipant] = useState({
        firstName: "", lastName: "", gender: "", dob: "", phone: "", email: "", city: "", state: "", 
        emergencyName: "", emergencyPhone: "", tshirtSize: "", nationality: "",
        idType: "",
        idNumber: "", 
        idFile: null,
        isConfirmed: false, 
        cause: causeOptions[0],
        dedication: "", 
        isDonationAcknowledged: false, 
    });
    const [charityDetails, setCharityDetails] = useState({
        selectedCharityId: charityOptions[0].id,
    });


    // --- Group State (UPDATED: Added queryBox) ---
    const [groupName, setGroupName] = useState("");
    const [groupMembers, setGroupMembers] = useState([
        {
            firstName: "", lastName: "", email: "", phone: "", gender: "", tshirtSize: "", nationality: "", address: "",
            raceId: defaultRace.id,
            idType: "",
            idNumber: "", 
            idFile: null,
            queryBox: "", // <--- ADDED FIELD for query box fix
        },
    ]);

    // State for Individual Registration fields (Unchanged)
    const [individualRunner, setIndividualRunner] = useState({
        firstName: "", lastName: "", parentName: "", parentPhone: "", email: "", phone: "", 
        whatsapp: "", dob: "", gender: "", bloodGroup: "", nationality: "", 
        address: "", city: "", state: "", pincode: "", country: "Indian", 
        experience: "", finishTime: "", dietary: "", tshirtSize: "",
        idType: "",
        idNumber: "", 
        idFile: null,
    });
    
    const handleIndividualChange = (field, value) => {
        if (field === 'gender') {
            setIndividualRunner(prev => ({ ...prev, gender: value, tshirtSize: "" }));
        } else {
            setIndividualRunner(prev => ({ ...prev, [field]: value }));
        }
    };
    
    const navigate = useNavigate();

    // Helper functions (UPDATED: Added queryBox)
    const newMemberObject = () => ({
        firstName: "", lastName: "", email: "", phone: "", gender: "", tshirtSize: "", nationality: "", address: "", raceId: defaultRace.id,
        queryBox: "", // <--- ADDED FIELD for query box fix
    });

    const handleAddMember = () => setGroupMembers((prev) => [ ...prev, newMemberObject(), ]);
    const handleRemoveMember = (indexToRemove) => setGroupMembers((prev) => prev.length <= 1 ? prev : prev.filter((_, i) => i !== indexToRemove));
    const setMemberCount = (count) => {
        const n = Math.max(1, Math.min(200, Number(count || 0))); 
        setGroupMembers((prev) => {
            const cur = prev.length;
            if (n === cur) return prev;
            if (n > cur) {
                const add = Array.from({ length: n - cur }, () => newMemberObject());
                return [...prev, ...add];
            } else {
                return prev.slice(0, n);
            }
        });
    };
    const handleMemberChange = (index, field, value) => {
        if (field === 'gender') {
            setGroupMembers(prev => prev.map((member, i) => 
                i === index ? { ...member, gender: value, tshirtSize: "" } : member
            ));
        } else {
            setGroupMembers(prev => prev.map((member, i) => 
                i === index ? { ...member, [field]: value } : member
            ));
        }
    };
    const handleCharityParticipantChange = (field, value) => {
        if (field === 'gender') {
            setCharityParticipant(prev => ({ 
                ...prev, 
                gender: value,
                tshirtSize: "" // Reset size
            }));
        } else {
            setCharityParticipant(prev => ({ ...prev, [field]: value }));
        }
    };
    
    // FIX 1: Define memberCount early to avoid ReferenceError in JSX/calculations
    const memberCount = groupMembers.length; 

    // --- MANDATORY ADD-ONS FEE ---
    const mandatoryAddOns = 0; // FIXED: Set to 0 to remove the base cost
    
    // --- CALCULATIONS ---
    // Initialize calculation variables
    let platformFee = 0;
    let rawRegistrationFee = 0; 
    let discountAmount = 0;
    let pgBaseForRegFee = 0; // Registration Fee - Discount (Base for PG Fee calculation)
    let pgFee = 0;
    let gstAmount = 0;
    let totalAmountPayable = 0;
    let discountPercent = 0; 

    // --- Determine Base Registration Fee (rawRegistrationFee) ---
    if (registrationType === "individual" || registrationType === "charity") {
        if (selectedRace) {
            rawRegistrationFee = (registrationType === "individual") 
                ? selectedRace.prebookPrice 
                : selectedRace.charityFee;
            
            discountAmount = 0; 
        }
    } else if (registrationType === "group") {
        const memberPrices = groupMembers.map(member => {
            const race = raceCategories.find(r => r.id === member.raceId);
            return race ? race.prebookPrice : 0; 
        });

        rawRegistrationFee = memberPrices.reduce((sum, price) => sum + price, 0);
        
        // Group Discount calculation remains the same, based on rawRegistrationFee
        if (memberCount >= 25) discountPercent = 20;
        else if (memberCount >= 10) discountPercent = 15;
        else if (memberCount >= 5) discountPercent = 10;

        if (discountPercent > 0) {
            discountAmount = Math.round(rawRegistrationFee * (discountPercent / 100));
        }
    }

    // STEP 1: Calculate PG FEE BASE (Registration Fee - Discount)
    pgBaseForRegFee = rawRegistrationFee - discountAmount;
    
    // STEP 2: Calculate Platform Fee
    const currentRaceId = selectedRace?.id || (groupMembers.length > 0 ? groupMembers[0].raceId : null);
    if (currentRaceId) {
        platformFee = getPlatformFee(currentRaceId);
    }

    // STEP 3: Calculate Subtotal before PG/GST (RegFeeNet + PF)
    // mandatoryAddOns removed from this line
    const subtotalBeforePG = pgBaseForRegFee + platformFee; 

    // STEP 4: Calculate PG Fee and GST (Based on pgBaseForRegFee, 2.1%)
    const pgFeeRaw = pgBaseForRegFee * PG_FEE_RATE;
    pgFee = roundToTwoDecimal(pgFeeRaw);
    
    const gstAmountRaw = pgFee * GST_RATE;
    gstAmount = roundToTwoDecimal(gstAmountRaw);

    // STEP 5: Calculate Final Total Payable (Total Payable = Subtotal + PG Fee + GST)
    totalAmountPayable = roundToTwoDecimal(subtotalBeforePG + pgFee + gstAmount);
    
    // FIX FOR CRASH: Ensure groupMembers is not empty before attempting to reduce/summarize
    const calculateRaceSummary = (members) => {
        if (!members || members.length === 0) return {};
        
        return members.reduce((acc, member) => {
            const race = raceCategories.find(r => r.id === member.raceId);
            // Defensive check to handle null member or race during rapid state changes
            if (race && member && member.raceId) { 
                acc[race.name] = (acc[race.name] || 0) + 1;
            }
            return acc;
        }, {});
    };

    const raceSummaryData = registrationType === "group" ? calculateRaceSummary(groupMembers) : null;
    // CRASH FIX: Object.entries must always be called on a valid object (or null/false if checked in JSX)
    const raceSummary = raceSummaryData ? Object.entries(raceSummaryData) : null;
    // --- END CALCULATIONS ---

    // --- START VALIDATION FUNCTION (Unchanged) ---
    const validateForm = () => {
        if (!selectedRace && (registrationType === "individual" || registrationType === "charity")) {
            alert("Please select a Race Category.");
            return false;
        }

        // Using `totalAmountPayable` for final validity check
        if (totalAmountPayable <= 0) {
            alert("Total payable amount is zero. Please select a valid registration option.");
            return false;
        }

        if (registrationType === "individual") {
            const requiredFields = ['firstName', 'lastName', 'parentName', 'parentPhone', 'email', 'phone', 'dob', 'gender', 'bloodGroup', 'nationality', 'address', 'city', 'state', 'pincode', 'country', 'experience', 'tshirtSize', 'idType', 'idNumber', 'idFile']; 
            for (const field of requiredFields) {
                if (!individualRunner[field] || individualRunner[field] === "") {
                    alert(`Please fill the required field in Personal/Address/Runner Information: ${field}`);
                    return false;
                }
            }
            return true;
        }

        if (registrationType === "group") {
            if (!groupName) {
                alert("Group Name is mandatory.");
                return false;
            }
            for (let i = 0; i < groupMembers.length; i++) {
                const member = groupMembers[i];
                const requiredFields = ['raceId', 'firstName', 'lastName', 'email', 'phone', 'gender', 'tshirtSize'];
                for (const field of requiredFields) {
                    if (!member[field] || member[field] === "") {
                        alert(`Please fill the required field for Member ${i + 1}: ${field}`);
                        return false;
                    }
                }
                if (i === 0) {
                    if (!member.nationality || !member.address || !member.idType || !member.idNumber || !member.idFile) { 
                        alert("Group Leader (Member 1) must provide Nationality, Address, and National Identity Card details.");
                        return false;
                    }
                }
            }
            return true;
        }
        
        if (registrationType === "charity") {
            if (!charityParticipant.isConfirmed) {
//                 alert("Please confirm charity participation.");
                return false;
            }
            if (!charityParticipant.isDonationAcknowledged) {
                alert("Please acknowledge the donation terms.");
                return false;
            }
            const requiredFields = ['firstName', 'lastName', 'gender', 'dob', 'phone', 'email', 'city', 'state', 'emergencyName', 'emergencyPhone', 'tshirtSize', 'cause', 'nationality', 'idType', 'idNumber', 'idFile'];
            for (const field of requiredFields) {
                if (!charityParticipant[field] || charityParticipant[field] === "") {
                    alert(`Please fill the required field in Charity Participant Information: ${field}`);
                    return false;
                }
            }
            return true;
        }

        return true; 
    };
    // --- END VALIDATION FUNCTION ---

    // --- CRITICAL FIX: ASYNC API SUBMISSION (UPDATED for breakdown) ---
    const handleProceedToPayment = async (e) => {
        e.preventDefault(); 
        
        if (!validateForm()) {
            return; 
        }

        if (!token) {
            alert("Error: User session expired. Please log in again.");
            return;
        }

        let dataToSave;
        if (registrationType === 'individual') {
            dataToSave = individualRunner;
        } else if (registrationType === 'charity') {
            dataToSave = charityParticipant;
        } else if (registrationType === 'group') {
            dataToSave = { groupName, groupMembers };
        }
        
        // --- 1. CONSTRUCT FormData for file upload ---
        const formData = new FormData();
        formData.append('registrationType', registrationType);
        // Use selected race ID for individual/charity, or first member's race ID for group
        const raceIdToSave = selectedRace?.id || groupMembers[0]?.raceId;
        formData.append('raceId', raceIdToSave);

        if (registrationType === 'individual' || registrationType === 'charity') {
            for (const key in dataToSave) {
                if (key !== 'idFile') {
                    formData.append(key, dataToSave[key]);
                }
            }
            formData.append('idProofFile', dataToSave.idFile); 
            
        } else if (registrationType === 'group') {
            formData.append('groupName', groupName);
            
            // Map members to exclude the large File object before JSON stringification
            formData.append('groupMembers', JSON.stringify(groupMembers.map(({ idFile, ...rest }) => rest))); 
            formData.append('idProofFile', groupMembers[0].idFile); 
        }

        let currentRegistrationId = null; 

        try {
            // --- ATTEMPT TO SAVE REGISTRATION DETAILS ---
            console.log("[FRONTEND SAVING REGISTRATION]: POST /api/register");
            
            const response = await api('/api/register', {
                method: 'POST',
                body: formData, 
                token: token,
            });

            // SUCCESSFUL SAVE PATH
            currentRegistrationId = response.registrationId; 
            console.log(`[REGISTRATION SUCCESS]: Saved ID ${currentRegistrationId}. Redirecting...`);
            
        }
catch (error) {
    console.error("Registration Save Error:", error.message);
    
    // --------------------------------------------------------
    // --- 1. HANDLE CONFUSING ERROR MESSAGE / NO LOGIN (NEW) ---
    // --------------------------------------------------------
    // Check for a common authentication failure message (e.g., from authMiddleware) 
    // OR the confusing "User already has an active registration."
    const needsAuthMessage = "User already has an active registration.";
    
    if (error.message && (error.message.includes("Unauthorized") || error.message.includes(needsAuthMessage))) {
        // Display the helpful message you requested
        alert("To proceed, please first Sign Up (Create Account) in the top-right corner, and then Log In.");
        return; // ⛔ STOP execution here
    }
    
    // ------------------------------------------------------
    // --- 2. HANDLE EXISTING REGISTRATION (Existing Code) ---
    // ------------------------------------------------------
    if (
        error.errorCode === "REGISTRATION_EXISTS" &&
        error.registrationId
    ) {
        console.log("[EXISTING REGISTRATION]: Redirecting to payment");

        navigate("/payment", {
            state: {
                // ... rest of your state passed for payment redirect ...
                amount: totalAmountPayable,
                registrationType,
                raceCategory: selectedRace?.name || groupMembers[0]?.raceId,
                registrationId: error.registrationId,
                rawRegistrationFee,
                discountAmount,
                platformFee,
                addOns: mandatoryAddOns,
                pgFee,
                gstAmount
            }
        });
        return; // ⛔ STOP execution here
    } 
    
    // ------------------------------------------------------
    // --- 3. HANDLE ALL OTHER UNEXPECTED ERRORS (Default) ---
    // ------------------------------------------------------
    else {
        // This handles validation errors or other true failures
        alert(error.message || "Failed to save registration due to an unknown error.");
        return;
    }
}

        
        // --- FINAL STEP: REDIRECT TO PAYMENT PAGE (Passing full breakdown) ---
        if (currentRegistrationId) {
            navigate("/payment", {
                state: {
                    // Pass the amount *including* platform fee, as PG is calculated on this base
                    amount: totalAmountPayable, 
                    registrationType,
                    raceCategory: selectedRace?.name || groupMembers[0]?.raceId, // Pass category name
                    registrationId: currentRegistrationId,
                    // Pass Breakdown for PaymentPage Summary
                    rawRegistrationFee: rawRegistrationFee,
                    discountAmount: discountAmount,
                    platformFee: platformFee,
                    addOns: mandatoryAddOns, // Now sends 0
                    pgFee: pgFee,
                    gstAmount: gstAmount
                },
            });
        }

    };
    // --- END CRITICAL FIX: ASYNC API SUBMISSION ---


    const isRaceSelectionMissing = (registrationType === "individual" || registrationType === "charity") && !selectedRace;


    return (
        <main className="min-h-screen bg-slate-50">
            <section className="max-w-6xl mx-auto px-4 py-12">
                <div className="text-center mb-10 mt-10">
                    <h1 className="text-3xl md:text-4xl font-extrabold text-teal-700 tracking-tight">
                        Register for LokRaja Marathon 2026
                    </h1>
                    <p className="mt-3 text-slate-600">Choose your registration type and complete your details</p>
                </div>

                <form onSubmit={handleProceedToPayment} className="space-y-8">
                    {/* Registration Type Selection (Unchanged) */}
                    <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                        <h2 className="text-xl font-semibold text-slate-900">Registration Type</h2>
                        <p className="text-sm text-slate-500 mt-1">Choose between individual, group, or charity registration</p>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                            <button type="button" onClick={() => setRegistrationType("individual")} className={`rounded-2xl border p-4 text-left transition ${registrationType === "individual" ? "border-teal-600 bg-teal-50" : "border-slate-200 hover:border-teal-400"}`}>
                                <h3 className="font-semibold text-slate-900">Individual Registration</h3>
                                <p className="text-sm text-slate-600 mt-1">Register as a single participant.</p>
                            </button>
                            <button type="button" onClick={() => setRegistrationType("group")} className={`rounded-2xl border p-4 text-left transition ${registrationType === "group" ? "border-teal-600 bg-teal-50" : "border-slate-200 hover:border-teal-400"}`}>
                                <h3 className="font-semibold text-slate-900">Group Registration</h3>
                                <p className="text-sm text-slate-600 mt-1">Register multiple participants together. Discounts available for 5, 10, or 25+ members.</p>
                            </button>
                            <button type="button" onClick={() => setRegistrationType("charity")} className={`rounded-2xl border p-4 text-left transition ${registrationType === "charity" ? "border-teal-600 bg-teal-50" : "border-slate-200 hover:border-teal-400"}`}>
                                <h3 className="font-semibold text-slate-900">Charity Registration</h3>
                                <p className="text-sm text-slate-600 mt-1">Run for a cause and support a charity.</p>
                            </button>
                        </div>

                        {/* Info Box (Unchanged) */}
                        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 px-5 py-4 flex items-start gap-3">
                            <div className="mt-1">
                                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-teal-50 text-teal-600">
                                    {registrationType === "individual" && "👤"}
                                    {registrationType === "group" && "👥"}
                                    {registrationType === "charity" && "🎗️"}
                                </span>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-900">
                                    {registrationType === "individual" && "Individual Registration"}
                                    {registrationType === "group" && "Group Registration"}
                                    {registrationType === "charity" && "Charity Registration"}
                                </h3>
                                <p className="text-sm text-slate-600 mt-1">
                                    {registrationType === "individual" && "Register yourself for the marathon."}
                                    {registrationType === "group" && "Register multiple participants together. Discounts available for 5, 10, or 25+ members."}
                                    {registrationType === "charity" && "Your registration includes the race fee and a fixed, non-refundable donation component."}
                                </p>
                            </div>
                            
                        </div>
                    </div>

                    {/* Choose Race Category (Individual & Charity) */}
                    {(registrationType === "individual" || registrationType === "charity") && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                            <div className="flex items-center gap-2">
                                <span className="text-teal-600 text-xl">🏆</span>
                                <h2 className="text-xl font-semibold text-slate-900">Choose Your Race Category</h2>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">Select the distance that matches your goals</p>
                            
                            {isRaceSelectionMissing && (
                                <div className="my-4 p-3 rounded-xl bg-rose-50 text-rose-700 text-sm font-semibold border border-rose-300">
                                    Please select a race category to proceed with registration.
                                </div>
                            )}


                            <div className="mt-6 grid gap-4 md:grid-cols-3">
                                {raceCategories.map((race) => {
                                    // Safely check if selectedRace is non-null before checking its ID
                                    const isSelected = selectedRace && selectedRace.id === race.id;
                                    // PRICE LOGIC: Use charityFee for charity registration, prebookPrice for individual
                                    const priceToDisplay = registrationType === "charity" ? race.charityFee : race.prebookPrice;

                                    return (
                                        <button
                                            key={race.id}
                                            type="button"
                                            onClick={() => {
                                                if (isSelected) {
                                                    setSelectedRace(null); 
                                                } else {
                                                    setSelectedRace(race);
                                                }
                                            }}
                                            className={`cursor-pointer relative w-full text-left rounded-2xl border px-5 py-4 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 ${isSelected ? "border-teal-500 bg-cyan-50 shadow-sm" : "border-slate-200 hover:border-teal-300 hover:bg-slate-50"}`}
                                        >
                                            <div className="flex justify-between items-start gap-3">
                                                <div>
                                                    <p className="font-semibold text-slate-900">{race.name}</p>
                                                    <p className="text-sm text-slate-500 mt-1">{race.description}</p>
                                                </div>
                                                
                                                {/* START MODIFIED PRICE BLOCK (INDIVIDUAL ONLY) */}
                                                {registrationType === "individual" ? (
                                                    <div className="flex flex-col items-end">
                                                        {/* REGULAR PRICE (CUT OFF) */}
                                                        <span className="text-sm font-medium text-slate-500 line-through opacity-70">
                                                            ₹{race.regularPrice}
                                                        </span>
                                                        {/* PRE-BOOK PRICE (ACTUAL PRICE) */}
                                                        <span className="inline-flex items-center rounded-full px-3 py-1 text-base font-bold bg-teal-600 text-white shadow-md">
                                                            ₹{race.prebookPrice}
                                                        </span>
                                                    </div>
                                                ) : (
                                                    /* CHARITY PRICE (Original logic, UNCHANGED) */
                                                    <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold bg-cyan-500 text-white">
                                                        ₹{priceToDisplay}
                                                    </span>
                                                )}
                                            </div>
                                            
                                            {registrationType === "charity" && (
                                                <p className="text-xs text-rose-500 mt-1">
                                                    (Fixed Charity Fee)
                                                </p>
                                            )}

                                            {isSelected && (
                                                <div className="mt-3 flex items-center gap-2 text-xs font-medium text-teal-700">
                                                    <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-teal-600 text-white text-[10px]">✓</span>
                                                    <span>Selected</span>
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                            
                        </div>
                    )}

                    {/* Charity Participant Information (UPDATED with constraints) */}
                    {registrationType === "charity" && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
                            <div className="flex items-center gap-2">
                                <span className="text-teal-600 text-xl">🏃‍♀️</span>
                                <h2 className="text-xl font-semibold text-slate-900">Charity Participant Information</h2>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">Please provide your details and confirm charity commitment.</p>

                            {/* Charity Confirmation Checkbox */}
                            <div className="p-4 rounded-xl border border-rose-300 bg-rose-50">
                                <label className="flex items-center gap-3 text-sm font-semibold text-rose-700">
                                    <input 
                                        type="checkbox" 
                                        checked={charityParticipant.isDonationAcknowledged}
                                        onChange={(e) => handleCharityParticipantChange('isDonationAcknowledged', e.target.checked)}
                                        className="mt-1 h-4 w-4 rounded border-rose-500 text-rose-600 focus:ring-rose-500"
                                        required
                                    />
                                    <span>I am participating under Charity Registration *</span>
                                </label>
                            </div>

                            {/* Normal Runner Details (UPDATED with constraints) */}
                            <div className="mt-6 grid md:grid-cols-2 gap-4">
                                {/* Full Name (Enforced letters) */}
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label><input type="text" value={charityParticipant.firstName} onChange={(e) => handleCharityParticipantChange('firstName', e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label><input type="text" value={charityParticipant.lastName} onChange={(e) => handleCharityParticipantChange('lastName', e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                
                                {/* Gender & DOB (Max=Today) */}
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label>
                                    <select value={charityParticipant.gender} onChange={(e) => handleCharityParticipantChange('gender', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required>
                                        <option value="">Select gender</option>
                                        {genders.map((g) => <option key={g} value={g}>{g}</option>)}
                                    </select>
                                </div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label><input type="date" value={charityParticipant.dob} onChange={(e) => handleCharityParticipantChange('dob', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required max={today} /></div>

                                {/* Contact (Enforced numbers) */}
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Mobile Number *</label><input  minLength="10"  maxLength="10"   type="tel" pattern="[0-9]{6,}" value={charityParticipant.phone} onChange={(e) => handleCharityParticipantChange('phone', e.target.value)} onKeyPress={handleNumberKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Email ID *</label><input type="email" value={charityParticipant.email} onChange={(e) => handleCharityParticipantChange('email', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>

                                {/* City/State (Enforced letters) */}
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">City *</label><input type="text" value={charityParticipant.city} onChange={(e) => handleCharityParticipantChange('city', e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">State *</label>
                                    <select value={charityParticipant.state} onChange={(e) => handleCharityParticipantChange('state', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required>
                                        <option value="">Select state</option>
                                        {statesInIndia.map((state) => <option key={state} value={state}>{state}</option>)}
                                    </select>
                                </div>

                                {/* Emergency Contact (Enforced letters and numbers) */}
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact Name *</label><input   type="text" value={charityParticipant.emergencyName} onChange={(e) => handleCharityParticipantChange('emergencyName', e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Emergency Contact Number *</label><input  minLength="10"  maxLength="10" type="tel" pattern="[0-9]{6,}" value={charityParticipant.emergencyPhone} onChange={(e) => handleCharityParticipantChange('emergencyPhone', e.target.value)} onKeyPress={handleNumberKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>

                                {/* Nationality */}
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Nationality *</label>
                                    <select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" value={charityParticipant.nationality} onChange={(e) => handleCharityParticipantChange('nationality', e.target.value)} required>
                                        <option value="">Select your nationality</option>
                                        {nationalitiesISO.map((country) => <option key={country} value={country}>{country}</option>)}
                                    </select>
                                </div>

                                {/* T-Shirt Size */}
                                <div className="md:col-span-2 md:max-w-xs relative">
                                    <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                                        T-Shirt Size *
                                        <button 
                                            type="button"
                                            onClick={() => toggleSizeChart('charity')} // Use a specific ID
                                            className="text-teal-600 hover:text-teal-800 text-lg font-bold ml-1"
                                            aria-label="View T-Shirt Size Chart"
                                        >
                                            ⓘ
                                        </button>
                                    </label>

                                    {/* Popover for Charity Registration */}
                                    {openPopoverId === 'charity' && (
                                        <TShirtSizePopover isOpen={true} onClose={() => setOpenPopoverId(null)} />
                                    )}

                                    <select value={charityParticipant.tshirtSize} onChange={(e) => handleCharityParticipantChange('tshirtSize', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required>
                                        <option value="">Select size</option>
                                        {/* DYNAMIC SIZE OPTIONS */}
                                        {getFilteredSizes(charityParticipant.gender).map((size) => (
                                            <option key={size.size} value={size.value}>
                                                {size.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* ADDED: ID Upload Block for Charity Registration (Unchanged) */}
                                <IdUploadBlock
                                    idType={charityParticipant.idType}
                                    idNumber={charityParticipant.idNumber} 
                                    idFile={charityParticipant.idFile}
                                    handleTypeChange={(field, value) => handleCharityParticipantChange(field, value)}
                                    handleNumberChange={(field, value) => handleCharityParticipantChange(field, value)}
                                    handleFileChange={(field, file) => handleCharityParticipantChange(field, file)}
                                    sectionId="charity-id"
                                />
                                {/* END ADDED: ID Upload Block */}
                                
                            </div>

                            {/* Charity Partner & Cause Selection (Unchanged) */}
                            <div className="mt-8 pt-6 border-t border-slate-100 space-y-4">
                                <div className="grid md:grid-cols-2 gap-4">
                                    {/* Cause Selection */}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Cause Selection *</label>
                                        <select value={charityParticipant.cause} onChange={(e) => handleCharityParticipantChange('cause', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required>
                                            {causeOptions.map((cause) => <option key={cause} value={cause}>{cause}</option>)}
                                        </select>
                                </div>
                                </div>

                                {/* Optional Message / Dedication (Unchanged) */}
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Optional Message / Dedication</label>
                                    <textarea rows={2} value={charityParticipant.dedication} onChange={(e) => handleCharityParticipantChange('dedication', e.target.value)} placeholder="e.g., Running in memory of my grandmother..." className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" />
                                </div>
                            </div>

                            {/* Donation Acknowledgement Checkbox (Unchanged) */}
                            <div className="pt-4 mt-4 border-t border-slate-100">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Donation Acknowledgement</label>
                                <label className="flex items-start gap-3 text-sm text-slate-700">
                                    <input 
                                        type="checkbox" 
                                        checked={charityParticipant.isDonationAcknowledged}
                                        onChange={(e) => handleCharityParticipantChange('isDonationAcknowledged', e.target.checked)}
                                        className="mt-1 h-4 w-4 rounded border-rose-500 text-rose-600 focus:ring-rose-500"
                                        required
                                    />
                                    <span>I understand that a portion of my registration fee will be donated to charity and is non-refundable. *</span>
                                </label>
                            </div>

                        </div>
                    )}
                    
                    {/* Group Registration Details (UPDATED with constraints & QueryBox fix) */}
                    {registrationType === "group" && (
                        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                            <h2 className="text-xl font-semibold text-slate-900">Group Registration Details</h2>
                            <p className="text-sm text-slate-500 mt-1">Enter details for all group members. Tiered discounts apply for 5, 10, or 25+ members.</p>

                            <div className="mt-6 grid md:grid-cols-[2fr,1fr,auto] gap-4 items-end">
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Group Name *</label><input type="text" value={groupName} onChange={(e) => setGroupName(e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                <div><label className="block text-sm font-medium text-slate-700 mb-1">Number of Members</label><div className="flex items-center gap-2">
                                    <button type="button" onClick={() => setMemberCount(memberCount - 1)} className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700" aria-label="Decrease members">−</button>
                                    <input type="number" min={1} max={200} value={memberCount} onChange={(e) => setMemberCount(Number(e.target.value))} className="w-20 text-center rounded-xl border border-slate-200 px-3 py-2 text-sm" />
                                    <button type="button" onClick={() => setMemberCount(memberCount + 1)} className="inline-flex items-center justify-center h-10 w-10 rounded-xl border border-slate-200 bg-white text-slate-700" aria-label="Increase members">+</button>
                                </div><p className="text-xs text-slate-500 mt-1">Group leader can set number of members. Minimum 1.</p></div>
                                <div className="flex md:justify-end">
                                    <button type="button" onClick={handleAddMember} className="inline-flex items-center rounded-xl bg-teal-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-teal-700">Add Member</button>
                                </div>
                            </div>

                            <div className="mt-6 space-y-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/60 p-4 md:p-5">
                                {groupMembers.map((member, index) => (
                                    <div key={index} className="border border-slate-200 rounded-2xl bg-white p-4 md:p-5">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-slate-900">Member {index + 1} - {raceCategories.find(r => r.id === member.raceId)?.name || 'Select Race'}</h3>
                                            {groupMembers.length > 1 && (<button type="button" onClick={() => handleRemoveMember(index)} className="text-xs text-rose-600 hover:underline" title={`Remove member ${index + 1}`}>Remove</button>)}
                                        </div>
                                        <div className="grid md:grid-cols-4 gap-4 mb-4">
                                            <div>
                                            <label className="block text-sm font-medium text-slate-700 mb-1">Race Category *</label>
                                            <select 
                                                value={member.raceId} 
                                                onChange={(e) => handleMemberChange(index, "raceId", e.target.value)} 
                                                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" 
                                                required
                                            >
                                                <option value="">Select race</option>
                                                {raceCategories.map((race) => (
                                                    <option key={race.id} value={race.id}>
                                                        {race.name} (Reg: ₹{race.regularPrice} / Pre-Book: ₹{race.prebookPrice}) 
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                            {/* Name Inputs (Enforced letters) */}
                                            <div><label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label><input type="text" value={member.firstName} onChange={(e) => handleMemberChange(index, "firstName", e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label><input type="text" value={member.lastName} onChange={(e) => handleMemberChange(index, "lastName", e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Email *</label><input type="email" value={member.email} onChange={(e) => handleMemberChange(index, "email", e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                        </div>
                                        <div className="grid md:grid-cols-4 gap-4">
                                            {/* Phone (Enforced numbers) */}
                                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone *</label><input  minLength="10"  maxLength="10" type="tel" pattern="[0-9]{6,}" value={member.phone} onChange={(e) => handleMemberChange(index, "phone", e.target.value)} onKeyPress={handleNumberKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                            <div><label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label><select value={member.gender} onChange={(e) => handleMemberChange(index, "gender", e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required><option value="">Select gender</option>{genders.map((g) => (<option key={g} value={g}>{g}</option>))}</select></div>
                                            {/* T-Shirt Size */}
                                            <div className="relative">
                                                <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                                                    T-Shirt Size *
                                                    <button 
                                                        type="button"
                                                        onClick={() => toggleSizeChart(`group-${index}`)} // Use a unique ID for each member
                                                        className="text-teal-600 hover:text-teal-800 text-lg font-bold ml-1"
                                                        aria-label="View T-Shirt Size Chart"
                                                    >
                                                        ⓘ
                                                    </button>
                                                </label>
                                                {/* Popover for Group Member */}
                                                {openPopoverId === `group-${index}` && (
                                                    <TShirtSizePopover isOpen={true} onClose={() => setOpenPopoverId(null)} />
                                                )}
                                                <select value={member.tshirtSize} onChange={(e) => handleMemberChange(index, "tshirtSize", e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required>
                                                    <option value="">Select size</option>
                                                    {/* DYNAMIC SIZE OPTIONS */}
                                                    {getFilteredSizes(member.gender).map((size) => (
                                                        <option key={size.size} value={size.value}>
                                                            {size.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            {/* END T-Shirt Size Size - MODIFIED FOR GROUP MEMBERS */}
                                            <div>{index === 0 && (<div><label className="block text-sm font-medium text-slate-700 mb-1">Nationality *</label><select value={member.nationality} onChange={(e) => handleMemberChange(index, "nationality", e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required><option value="">Select nationality</option>{nationalitiesISO.map((country) => (<option key={country} value={country}>{country}</option>))}</select></div>)}</div>
                                        </div>
                                        {/* ADDED: ID Upload Block for Group Leader (Member 1) (Unchanged) */}
                                        {index === 0 && (
                                            <>
                                                <IdUploadBlock
                                                    idType={member.idType}
                                                    idNumber={member.idNumber}
                                                    idFile={member.idFile}
                                                    handleTypeChange={(field, value) => handleMemberChange(index, field, value)}
                                                    handleNumberChange={(field, value) => handleMemberChange(index, field, value)}
                                                    handleFileChange={(field, file) => handleMemberChange(index, field, file)}
                                                    sectionId={`group-id-${index}`}
                                                />
                                                
                                                {/* CORRECTED ADDRESS AND QUERY BOX FIELDS */}
                                                <div className="mt-4">
                                                    <label className="block text-sm font-medium text-slate-700 mb-1">Address *</label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={member.address} 
                                                        onChange={(e) => handleMemberChange(index, "address", e.target.value)} 
                                                        placeholder="House/Flat No., Street, Area, City" 
                                                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" 
                                                        required 
                                                    />
                                                    
                                                    <label className="block text-sm font-medium text-slate-700 mb-1 mt-4">Query Box </label>
                                                    <textarea 
                                                        rows={2} 
                                                        value={member.queryBox} 
                                                        onChange={(e) => handleMemberChange(index, "queryBox", e.target.value)} 
                                                        placeholder="For any query write here will try to solve them." 
                                                        className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" 
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    
                    {/* Individual: Personal Information & Other Sections (UPDATED with constraints) */}
                    {registrationType === "individual" && (
                        <>
                            {/* Personal Information */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                                <h2 className="text-xl font-semibold text-slate-900">Personal Information</h2>
                                <p className="text-sm text-slate-500 mt-1">Please provide your complete personal details as per government ID</p>

                                <div className="mt-6 grid md:grid-cols-2 gap-4">
                                    {/* Full Name (Enforced letters) */}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">First Name *</label><input type="text" value={individualRunner.firstName} onChange={(e) => handleIndividualChange('firstName', e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Last Name *</label><input type="text" value={individualRunner.lastName} onChange={(e) => handleIndividualChange('lastName', e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                    {/* Parent/Emergency Name (Enforced letters) */}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Parent / Emergency Name *</label><input type="text" value={individualRunner.parentName} onChange={(e) => handleIndividualChange('parentName', e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                    {/* Parent/Emergency Phone (Enforced numbers) */}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Parent / Emergency Number *</label><input  minLength="10"  maxLength="10" type="tel" pattern="[0-9]{6,}" value={individualRunner.parentPhone} onChange={(e) => handleIndividualChange('parentPhone', e.target.value)} onKeyPress={handleNumberKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                    {/* Email Address (Type="email") */}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Email Address *</label><input type="email" value={individualRunner.email} onChange={(e) => handleIndividualChange('email', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                    {/* Phone Number (Enforced numbers) */}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Phone Number *</label><input  minLength="10"  maxLength="10" type="tel" pattern="[0-9]{6,}" value={individualRunner.phone} onChange={(e) => handleIndividualChange('phone', e.target.value)} onKeyPress={handleNumberKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                    {/* WhatsApp Number (Enforced numbers) */}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label><input  minLength="10"  maxLength="10" type="tel" pattern="[0-9]{6,}" placeholder="If different from phone" value={individualRunner.whatsapp} onChange={(e) => handleIndividualChange('whatsapp', e.target.value)} onKeyPress={handleNumberKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" /></div>
                                    {/* Date of Birth (Max=Today) */}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Date of Birth *</label><input type="date" value={individualRunner.dob} onChange={(e) => handleIndividualChange('dob', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required max={today} /></div>
                                    {/* Gender, Blood Group, Nationality (Selects, OK) */}
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Gender *</label><select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" value={individualRunner.gender} onChange={(e) => handleIndividualChange('gender', e.target.value)} required><option value="">Select gender</option>{genders.map((g) => (<option key={g} value={g}>{g}</option>))}</select></div>
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Blood Group *</label><select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" value={individualRunner.bloodGroup} onChange={(e) => handleIndividualChange('bloodGroup', e.target.value)} required><option value="">Select blood group</option>{bloodGroups.map((b) => (<option key={b} value={b}>{b}</option>))}</select></div>
                                    <div className="md:col-span-2 md:max-w-xs"><label className="block text-sm font-medium text-slate-700 mb-1">Nationality *</label><select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" value={individualRunner.nationality} onChange={(e) => handleIndividualChange('nationality', e.target.value)} required><option value="">Select your nationality</option>{nationalitiesISO.map((b) => (<option key={b} value={b}>{b}</option>))}</select></div>
                                </div>
                                
                                {/* ADDED: ID Upload Block for Individual Registration (Unchanged) */}
                                <IdUploadBlock
                                    idType={individualRunner.idType}
                                    idNumber={individualRunner.idNumber} 
                                    idFile={individualRunner.idFile}
                                    handleTypeChange={handleIndividualChange}
                                    handleNumberChange={handleIndividualChange} 
                                    handleFileChange={handleIndividualChange}
                                    sectionId="individual-id"
                                />
                                {/* END ADDED: ID Upload Block */}
                            </div>

                            {/* Address Information (UPDATED with constraints) */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                                <h2 className="text-xl font-semibold text-slate-900">Address Information</h2>
                                <p className="text-sm text-slate-500 mt-1">Your current residential address</p>
                                <div className="mt-6 space-y-4">
                                    <div><label className="block text-sm font-medium text-slate-700 mb-1">Complete Address *</label><textarea rows={3} placeholder="House/Flat No., Street, Area" value={individualRunner.address} onChange={(e) => handleIndividualChange('address', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div><label className="block text-sm font-medium text-slate-700 mb-1">City *</label><input type="text" value={individualRunner.city} onChange={(e) => handleIndividualChange('city', e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                        <div><label className="block text-sm font-medium text-slate-700 mb-1">State *</label><select value={individualRunner.state} onChange={(e) => handleIndividualChange('state', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required><option value="">Select state</option>{statesInIndia.map((state) => (<option key={state} value={state}>{state}</option>))}</select></div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        {/* Pincode (Enforced numbers and length) */}
                                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Pincode *</label><input type="text" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} value={individualRunner.pincode} onChange={(e) => handleIndividualChange('pincode', e.target.value)} onKeyPress={handleNumberKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                        {/* Country (Enforced letters) */}
                                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Country *</label><input type="text" value={individualRunner.country} onChange={(e) => handleIndividualChange('country', e.target.value)} onKeyPress={handleNameKeyPress} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" required /></div>
                                    </div>
                                </div>
                            </div>

                            {/* Runner Information & Race Kit (Unchanged) */}
                            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8 space-y-6">
                                <div className="space-y-6">
                                    <h2 className="text-xl font-semibold text-slate-900">Runner Information</h2>
                                    <p className="text-sm text-slate-500 mt-1">Help us better understand your running profile</p>
                                    <div className="mt-6 grid md:grid-cols-2 gap-4">
                                        {/* Experience & Finish Time (Finish time remains type="text" for format flexibility) */}
                                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Previous Marathon Experience *</label><select className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" value={individualRunner.experience} onChange={(e) => handleIndividualChange('experience', e.target.value)} required><option value="">Select experience level</option><option value="first">First time</option><option value="beginner">Beginner (1–2 races)</option><option value="intermediate">Intermediate (3–5 races)</option><option value="advanced">Advanced (5+ races)</option></select></div>
                                        <div><label className="block text-sm font-medium text-slate-700 mb-1">Expected Finish Time</label><input type="text" placeholder="e.g., 4:30:00" value={individualRunner.finishTime} onChange={(e) => handleIndividualChange('finishTime', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" /></div>
                                    </div>
                                    {/* Dietary Restrictions (Type="text") */}
                                    <div className="mt-4"><label className="block text-sm font-medium text-slate-700 mb-1">Dietary Restrictions</label><input type="text" placeholder="Vegetarian, Vegan, Allergies, etc." value={individualRunner.dietary} onChange={(e) => handleIndividualChange('dietary', e.target.value)} className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50" /></div>
                                </div>

                                <div className="mt-4 rounded-2xl bg-cyan-50/60 border border-cyan-100 p-4 md:p-5">
                                    <div className="flex items-center gap-2 mb-2"><span className="text-xl">🎁</span><h2 className="text-lg font-semibold text-slate-900">Referral Code</h2></div>
                                    <p className="text-sm text-slate-600 mb-3">Have a referral code? Enter it here to earn bonus points!</p>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Referral Code (Optional)</label>
                                    <input type="text" placeholder="Enter referral code" className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50 bg-white" />
                                </div>

                                <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 md:p-8">
                                    <h2 className="text-xl font-semibold text-slate-900">Race Kit &amp; Additional Services</h2>
                                    <p className="text-sm text-slate-500 mt-1">Choose your preferences and additional services</p>
                                    <div className="mt-6 space-y-4">
                                        <div className="md:max-w-xs relative">
                                        {/* T-SHIRT SIZE INPUT (Parent needs position-relative for popover fix) */}
                                        <label className="block text-sm font-medium text-slate-700 mb-1 flex items-center gap-1">
                                            T-Shirt Size *
                                            <button 
                                                type="button"
                                                onClick={() => toggleSizeChart('individual')}
                                                className="text-teal-600 hover:text-teal-800 text-lg font-bold ml-1"
                                                aria-label="View T-Shirt Size Chart"
                                            >
                                                ⓘ
                                            </button>
                                        </label>

                                        {/* Popover for Individual Registration */}
                                        {openPopoverId === 'individual' && (
                                            <TShirtSizePopover isOpen={true} onClose={() => setOpenPopoverId(null)} />
                                        )}
                                        
                                        <select 
                                            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm bg-white shadow-sm focus:border-teal-500 focus:ring-2 focus:ring-teal-500/50"
                                            value={individualRunner.tshirtSize} onChange={(e) => handleIndividualChange('tshirtSize', e.target.value)}
                                            required
                                        >
                                            <option value="">Select t-shirt size</option>
                                            {/* DYNAMIC SIZE OPTIONS */}
                                            {getFilteredSizes(individualRunner.gender).map((size) => (
                                                <option key={size.size} value={size.value}>
                                                    {size.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                        <div className="space-y-2 text-sm text-slate-700">
                                            <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" /><span>I need accommodation assistance</span></label>
                                            <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-teal-600 focus:ring-teal-500" /><span>I need transportation assistance</span></label>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </>
                    )}

                    {/* Registration Summary & CTA (ADD-ONS REMOVED & DISCOUNT % ADDED) */}
                    <div className="bg-linear-to-br from-cyan-50 to-white rounded-3xl shadow-sm border border-cyan-100 p-6 md:p-8">
                        <h2 className="text-xl font-semibold text-slate-900">Registration Summary</h2>

                        <div className="mt-4 text-sm space-y-2">
                            <div className="flex justify-between">
                                <span className="text-slate-600">Registration Type:</span>
                                <span className="font-semibold text-slate-900 capitalize">{registrationType.replace("individual", "Individual").replace("group", "Group").replace("charity", "Charity")}</span>
                            </div>
                            
                            {/* Race Category Display for Individual/Charity */}
                            {(registrationType === "individual" || registrationType === "charity") && selectedRace && (
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Race Category:</span>
                                    <span className="font-semibold text-slate-900">{selectedRace.name}</span>
                                </div>
                            )}

                            {/* Group Members Breakdown (Display selected races/counts) */}
                            {registrationType === "group" && raceSummary && (
                                <>
                                    <div className="flex justify-between font-semibold text-slate-800 pt-2">
                                        <span>Group Members:</span>
                                        <span>{memberCount}</span>
                                    </div>
                                    {raceSummary.map(([name, count]) => (
                                        <div key={name} className="flex justify-between pl-4 text-xs text-slate-500">
                                            <span>- {name} registrations:</span>
                                            <span className="font-semibold">{count}</span>
                                        </div>
                                    ))}
                                </>
                            )}
                            {/* End Group Members Breakdown */}

                            {/* 1. Registration Fee (Base Price) */}
                            {rawRegistrationFee > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Registration Fee:</span>
                                    <span className="font-semibold text-slate-900">₹{rawRegistrationFee.toFixed(2)}</span>
                                </div>
                            )}

                            {/* 2. Discount (UPDATED with Percentage) */}
                            {discountAmount > 0 && (
                                <div className="flex justify-between text-green-600">
                                     {/* Display discount percentage */}
                                    <span className="font-semibold pl-4">Discount {discountPercent > 0 ? `(${discountPercent}%)` : ''}:</span>
                                    <span className="font-semibold">–₹{discountAmount.toFixed(2)}</span>
                                </div>
                            )}

                            {/* 3. Platform Fee (Non-taxable) */}
                            {platformFee > 0 && (
                                <div className="flex justify-between">
                                    <span className="text-slate-600">Platform Fee:</span>
                                    <span className="font-semibold text-slate-900">₹{platformFee.toFixed(2)}</span>
                                </div>
                            )}

                            {/* 4. Payment Gateway Fee (PG Fee) */}
                            {pgFee > 0 && (
                                <div className="flex justify-between text-slate-700 pt-2 border-t border-dashed border-slate-200">
                                    <span className="pl-4">Payment Gateway Fee :</span>
                                    <span>₹{pgFee.toFixed(2)}</span>
                                </div>
                            )}

                            {/* 5. GST (on PG Fee) */}
                            {gstAmount > 0 && (
                                <div className="flex justify-between text-slate-700">
                                    <span className="pl-4">GST @{GST_RATE * 100}% (on PG Fee):</span>
                                    <span>₹{gstAmount.toFixed(2)}</span>
                                </div>
                            )}
                        
                            <div className="pt-3 mt-2 border-t-2 border-slate-700 flex justify-between items-center">
                                <span className="text-xl font-extrabold text-slate-900">Total Payable:</span>
                                <span className="text-2xl font-extrabold text-teal-700">₹{totalAmountPayable.toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="mt-5 text-sm text-slate-600">
                            <p className="font-semibold mb-2">Registration fee includes:</p>
                            <ul className="list-disc list-inside space-y-1">
                                <li>Race kit with participant bib</li>
                                <li>Event t-shirt</li>
                                <li>Finisher medal</li>
                                <li>Refreshments during race</li>
                                <li>Digital certificate</li>
                            </ul>
                        </div>

                        <div className="mt-8 flex justify-center">
                            <button
                                type="submit" 
                                className={`cursor-pointer inline-flex items-center justify-center rounded-full bg-linear-to-r from-teal-600 to-cyan-500 px-16 py-3 text-sm md:text-base font-semibold text-white shadow-lg shadow-teal-500/30 hover:from-teal-700 hover:to-cyan-600 focus-visible:outline-none focus-visible:ring-2 focus:ring-teal-500 focus-visible:ring-offset-2 whitespace-nowrap ${totalAmountPayable === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                disabled={totalAmountPayable === 0}
                            >
                                Proceed to Payment - ₹{totalAmountPayable.toFixed(2)}
                            </button>
                        </div>
                    </div>
                </form>
            </section>
            
            {/* ADDED: T-Shirt Size Chart Modal/Popover outside the main section */}
            {openPopoverId && (
                <TShirtSizePopover isOpen={true} onClose={() => setOpenPopoverId(null)} />
            )}

        </main>
    );
}

export default Register;