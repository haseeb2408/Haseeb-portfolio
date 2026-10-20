export const profile = {
  name: "Haseeb Ahmed",
  firstName: "Haseeb",
  role: "AI Engineer",
  roles: [
    "AI Engineer",
    "LLM & RAG Architect",
    "Voice AI Builder",
    "Computer Vision Engineer",
    "Generative AI Developer",
  ],
  tagline:
    "I design and ship production AI systems: real-time voice agents, RAG pipelines, and computer vision models that run in the real world, not just in notebooks.",
  location: "Lahore, Pakistan",
  timezone: "Asia/Karachi",
  email: "ahmed0499280@gmail.com",
  phone: "+923285074527",
  github: "https://github.com/haseeb2408",
  linkedin: "https://www.linkedin.com/in/haseeb-ahmed-a20777228",
  resume: "/Haseeb-Ahmed-Resume.pdf",
  // drop your photo at public/profile.jpg (portrait, roughly 4:5)
  photo: "/profile.jpg",
  available: true,
};

export const stats = [
  { value: 3, suffix: "+", label: "Years building AI" },
  { value: 9, suffix: "", label: "Featured AI products" },
  { value: 3.88, suffix: "", label: "MS AI CGPA", decimals: 2 },
  { value: 7, suffix: "", label: "Certifications" },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "skills", label: "Stack" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "ask", label: "Ask AI" },
  { id: "contact", label: "Contact" },
];

export type SkillGroup = {
  title: string;
  blurb: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    title: "LLMs & Generative AI",
    blurb: "Agents, RAG, prompt design and evaluation",
    items: [
      "LangChain",
      "OpenAI",
      "OpenAI Realtime API",
      "HuggingFace Transformers",
      "Meta Llama",
      "Groq",
      "RAG",
      "Prompt Engineering",
    ],
  },
  {
    title: "Computer Vision",
    blurb: "Detection, segmentation and recognition",
    items: ["YOLO", "Mask R-CNN", "OpenCV", "FaceRecognition", "TensorFlow", "CNNs"],
  },
  {
    title: "Machine Learning",
    blurb: "Data to deployed model",
    items: ["Python", "Pandas", "NumPy", "Scikit-learn", "Keras", "Jupyter", "Google Colab"],
  },
  {
    title: "Backend & APIs",
    blurb: "Fast, scalable inference services",
    items: ["FastAPI", "Flask", "REST APIs", "Twilio", "ElevenLabs", "Gmail API", "Streamlit"],
  },
  {
    title: "Data & Vector Stores",
    blurb: "Memory for intelligent systems",
    items: ["ChromaDB", "PostgreSQL", "MongoDB", "Firebase", "SQL"],
  },
  {
    title: "Cloud & DevOps",
    blurb: "Shipping it to production",
    items: ["Docker", "AWS", "Git", "VS Code", "PyCharm"],
  },
];

export const marquee = [
  "Python",
  "LangChain",
  "OpenAI",
  "FastAPI",
  "RAG",
  "ChromaDB",
  "HuggingFace",
  "TensorFlow",
  "YOLO",
  "OpenCV",
  "Twilio",
  "ElevenLabs",
  "Docker",
  "AWS",
  "MongoDB",
  "PostgreSQL",
  "Llama",
  "Groq",
];

export type Experience = {
  role: string;
  company: string;
  period: string;
  current?: boolean;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    role: "AI Engineer",
    company: "Neurovise",
    period: "Apr 2025 — Present",
    current: true,
    summary:
      "Developing and deploying LLM-based applications end to end, from retrieval pipelines to containerised cloud services.",
    highlights: [
      "Built MoodMap and a multilingual Arabic learning assistant with LangChain, OpenAI and RAG",
      "Designed scalable FastAPI services with ChromaDB-backed semantic search",
      "Owned deployments with Docker and AWS",
      "Contributed to computer vision workloads across the product suite",
    ],
    stack: ["LangChain", "OpenAI", "FastAPI", "ChromaDB", "Docker", "AWS"],
  },
  {
    role: "Generative AI Developer",
    company: "Alright Tech",
    period: "Jan 2025 — Apr 2025",
    summary:
      "Built context-aware chatbots on a RAG architecture for business use cases.",
    highlights: [
      "Shipped LLM chatbots with LangChain, OpenAI and HuggingFace",
      "Developed Flask-based RESTful APIs for model serving",
      "Implemented prompt engineering, document indexing and vector DB integration",
    ],
    stack: ["LangChain", "HuggingFace", "Flask", "Vector DBs"],
  },
  {
    role: "Computer Vision Engineer",
    company: "Softwise Sol",
    period: "May 2023 — Jul 2024",
    summary:
      "Object detection and image segmentation for real-world, messy visual datasets.",
    highlights: [
      "Developed and optimised YOLO and Mask R-CNN models with OpenCV and TensorFlow",
      "Built custom data pipelines and annotation workflows",
      "Performance-tuned models for challenging visual conditions",
    ],
    stack: ["YOLO", "Mask R-CNN", "OpenCV", "TensorFlow"],
  },
];

export type ProjectCategory = "LLM & RAG" | "Voice AI" | "Computer Vision";

export type Project = {
  slug: string;
  title: string;
  kicker: string;
  category: ProjectCategory;
  summary: string;
  description: string;
  pipeline: string[];
  stack: string[];
  metric: { value: string; label: string };
  featured?: boolean;
  hue: number;
};

export const projects: Project[] = [
  {
    slug: "syntalk",
    title: "SynTalk",
    kicker: "Autonomous voice agent platform",
    category: "Voice AI",
    summary:
      "AI calling platform that handles inbound and outbound business calls, books appointments, qualifies leads and syncs with CRMs.",
    description:
      "An AI-driven conversational calling platform that autonomously handles business calls, guiding customers through booking flows, qualifying leads and syncing data with CRMs. I architected a real-time voice pipeline using FastAPI, Twilio, OpenAI Realtime API and ElevenLabs, with MongoDB managing multi-tenant configurations and dynamic agent instructions. It delivers sub-second responses, automated post-call emails via the Gmail API, and seamless CRM lead handoff.",
    pipeline: ["Caller", "Twilio", "Realtime LLM", "ElevenLabs", "CRM"],
    stack: ["FastAPI", "Twilio", "OpenAI Realtime", "ElevenLabs", "MongoDB", "Gmail API"],
    metric: { value: "<1s", label: "voice response latency" },
    featured: true,
    hue: 190,
  },
  {
    slug: "mynkl",
    title: "MyNKL",
    kicker: "AI mental wellness app",
    category: "LLM & RAG",
    summary:
      "Mood check-ins, a live emotion map of nearby users, and LLM-personalised activity suggestions.",
    description:
      "An AI-powered mental wellness app that lets users check in with their mood, view nearby users on a live emotion map, and receive personalised activity suggestions using LLMs and mood-based analysis. The FastAPI backend integrates PostgreSQL, Google Maps API, OpenAI and Spotify to deliver real-time, location-aware recommendations and push notifications, fostering emotional support and social connection.",
    pipeline: ["Mood check-in", "LLM analysis", "Geo match", "Spotify", "Suggestions"],
    stack: ["FastAPI", "PostgreSQL", "OpenAI", "Google Maps", "Spotify API"],
    metric: { value: "Live", label: "emotion map" },
    featured: true,
    hue: 280,
  },
  {
    slug: "synchat",
    title: "SynChat",
    kicker: "White-label RAG support bots",
    category: "LLM & RAG",
    summary:
      "Businesses upload products and docs; the bot answers customers strictly from that knowledge base. Embed with one link.",
    description:
      "A customisable AI customer support platform where businesses upload their products and documents to build a personalised knowledge base, and the chatbot answers customer queries grounded entirely in that business's content. Businesses get an embeddable link for their website plus a dashboard to configure the bot, manage documents and monitor conversations, so they can deploy a fully branded assistant with zero technical overhead.",
    pipeline: ["Docs upload", "Chunk + embed", "Vector store", "Retriever", "Grounded answer"],
    stack: ["RAG", "LangChain", "Vector DB", "OpenAI", "Dashboard"],
    metric: { value: "1-link", label: "embed deployment" },
    featured: true,
    hue: 160,
  },
  {
    slug: "cardnest",
    title: "CardNest",
    kicker: "Real-time card fraud detection",
    category: "Computer Vision",
    summary:
      "AI card scanning that validates security elements before a transaction, feeding a fraud intelligence engine.",
    description:
      "A fintech platform for real-time card fraud detection and chargeback prevention. I developed an AI-powered card scanning feature that analyses security elements, validates card authenticity and detects anomalies before transactions. The pipeline feeds a fraud intelligence engine using transaction history, location consistency and behavioural biometrics, all on a PCI-DSS compliant architecture that never stores sensitive cardholder data.",
    pipeline: ["Card scan", "CV checks", "Anomaly score", "Fraud engine", "Approve / flag"],
    stack: ["Computer Vision", "OpenCV", "Anomaly Detection", "PCI-DSS"],
    metric: { value: "0", label: "card data stored" },
    featured: true,
    hue: 30,
  },
  {
    slug: "arabic-chatbot",
    title: "Arabic Tutor",
    kicker: "Multilingual RAG learning assistant",
    category: "LLM & RAG",
    summary:
      "Helps English, Spanish and Arabic speakers learn Arabic through religious content, with premium subscriptions.",
    description:
      "A multilingual RAG-based Arabic learning chatbot built with FastAPI, LangChain and HuggingFace embeddings, helping English, Spanish and Arabic-speaking students learn Arabic through religious content. ChromaDB powers semantic search, MongoDB stores users and chat history, and OpenAI generates natural responses. PayPal integration unlocks premium content in a scalable subscription model.",
    pipeline: ["Question", "HF embeddings", "ChromaDB", "OpenAI", "Tutor reply"],
    stack: ["FastAPI", "LangChain", "HuggingFace", "ChromaDB", "MongoDB", "PayPal"],
    metric: { value: "3", label: "languages supported" },
    hue: 45,
  },
  {
    slug: "cold-email",
    title: "Cold Email Generator",
    kicker: "LLM outreach automation",
    category: "LLM & RAG",
    summary:
      "Scrapes job postings, matches them to candidate profiles in ChromaDB, and writes personalised emails with portfolio links.",
    description:
      "A Streamlit app built for an outsourcing company. It scrapes job postings, analyses requirements with Meta Llama served on Groq, compares them against candidate profiles stored in ChromaDB, and generates personalised outreach emails with portfolio links of qualified candidates.",
    pipeline: ["Job URL", "Scraper", "Llama on Groq", "Profile match", "Email draft"],
    stack: ["Python", "Streamlit", "Llama", "Groq", "ChromaDB", "LangChain"],
    metric: { value: "Auto", label: "personalised outreach" },
    hue: 330,
  },
  {
    slug: "face-attendance",
    title: "Face Attendance",
    kicker: "Real-time recognition system",
    category: "Computer Vision",
    summary:
      "Real-time student attendance using face encodings, synced instantly to Firebase.",
    description:
      "Real-time student attendance tracking using face encodings for recognition. OpenCV, FaceRecognition and NumPy enable accurate student identification, and attendance is stored instantly on Firebase for seamless tracking, giving schools an effortless way to monitor attendance.",
    pipeline: ["Camera", "Face detect", "Encodings", "Match", "Firebase"],
    stack: ["OpenCV", "FaceRecognition", "NumPy", "Firebase"],
    metric: { value: "Real-time", label: "identification" },
    hue: 210,
  },
  {
    slug: "potato-disease",
    title: "Potato Disease AI",
    kicker: "CNN plant pathology classifier",
    category: "Computer Vision",
    summary:
      "Deep learning model that separates healthy leaves from early and late blight.",
    description:
      "A TensorFlow CNN that classifies potato plant images into three categories: healthy, early blight and late blight. The work covered data collection, preprocessing, augmentation, training and evaluation, reaching high accuracy on real field imagery.",
    pipeline: ["Leaf image", "Augment", "CNN", "Softmax", "Diagnosis"],
    stack: ["TensorFlow", "Keras", "CNN", "Data Augmentation"],
    metric: { value: "3", label: "disease classes" },
    hue: 100,
  },
];

export const education = [
  {
    school: "University of Management and Technology",
    degree: "Masters in Artificial Intelligence",
    period: "2026 — Present",
    place: "Lahore",
    score: "CGPA 3.88",
  },
  {
    school: "PMAS Arid Agriculture University",
    degree: "Bachelors of Computer Science",
    period: "2020 — 2024",
    place: "Rawalpindi",
    score: "CGPA 3.26",
  },
];

export const certificates = [
  { title: "IBM Professional Certificate in Data Science", issuer: "IBM" },
  { title: "Generative AI with Large Language Models", issuer: "DeepLearning.AI" },
  { title: "Convolutional Neural Networks in TensorFlow", issuer: "DeepLearning.AI" },
  { title: "Intro to Deep Learning & Neural Networks with Keras", issuer: "DeepLearning.AI" },
  { title: "Introduction to Computer Vision and Image Processing", issuer: "IBM" },
  { title: "Introduction to TensorFlow for AI, ML and DL", issuer: "IBM" },
  { title: "Data Science", issuer: "PMAS UAAR" },
];
