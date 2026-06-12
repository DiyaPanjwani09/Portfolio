export const profileData = {
  fullName: "Diya Panjwani",
  role: "Aspiring Data Analyst & AI/ML Developer",
  email: "diyapanjwani00@gmail.com",
  phone: "+91 9406520174",
  location: "Gwalior, Madhya Pradesh, India",
  github: "https://github.com/DiyaPanjwani09",
  linkedin: "https://linkedin.com/in/diya-panjwani123",
  cgpa: "8.0",
  languages: ["English (Professional)", "Hindi (Native)"],
  interests: ["Web Dev", "Data Analytics", "AI/ML", "Open-Source"],
  
  taglines: [
    "Data Analyst.",
    "Python Developer.",
    "AI/ML Enthusiast.",
    "Leader."
  ],

  bio: "I'm a B.Tech Information Technology student at MITS Gwalior with a strong focus on data analytics, business intelligence, and AI/ML applications. I love transforming messy datasets into clear, interactive visuals and designing secure, robust software. As an AI-native developer, I actively integrate LLM tools into my workflow to build cutting-edge solutions.",

  skills: [
    {
      category: "Languages",
      items: ["Python", "C++", "SQL"]
    },
    {
      category: "Web Dev",
      items: ["HTML", "CSS", "JavaScript", "Responsive Design", "Flask", "React"]
    },
    {
      category: "Data Analytics",
      items: ["Advanced Excel", "Power BI", "Data Cleaning", "Data Visualization", "DAX"]
    },
    {
      category: "Libraries",
      items: ["Pandas", "NumPy", "Matplotlib"]
    },
    {
      category: "Tools",
      items: ["Git", "GitHub", "VS Code", "MySQL"]
    },
    {
      category: "AI Tools",
      items: ["Gemini", "GPT", "Claude", "Cursor"],
      highlight: true // Specially highlight this section in UI
    },
    {
      category: "Learning",
      items: ["Data Structures & Algorithms (DSA)"]
    }
  ],

  projects: [
    {
      id: "universal-analyser",
      title: "Universal Analyser",
      tag: "Data Analytics",
      summary: "Versatile data analysis platform for CSV/Excel datasets supporting end-to-end EDA, outlier detection, and statistical summaries via interactive interface.",
      description: "Built a versatile data analysis platform for CSV/Excel datasets supporting end-to-end EDA, outlier detection, and statistical summaries via interactive interface. Designed modular pipelines with automated chart generation (bar, scatter, heatmaps), reducing manual exploration effort for non-technical users. Integrated export functionality for processed reports and visualizations, making results reproducible and shareable.",
      stack: ["Python", "Pandas", "NumPy", "Matplotlib", "Power BI"],
      metrics: [
        { label: "Data Import", value: "CSV/Excel" },
        { label: "Charts Generated", value: "Automated" },
        { label: "Purpose", value: "End-to-End EDA" }
      ],
      github: "https://github.com/DiyaPanjwani09"
    },
    {
      id: "exam-system",
      title: "Online Examination & Result Management System",
      tag: "Web Application",
      summary: "Web application with role-based access control (RBAC) for students, faculty, and administrators.",
      description: "Architected a web application with role-based access control (RBAC) for students, faculty, and admin, built on Flask and a normalized MySQL schema. Implemented secure session-based authentication, automated result computation, and exam scheduling workflows, eliminating manual grading overhead. Designed RESTful API endpoints for exam creation, submission handling, and real-time result generation with validation middleware.",
      stack: ["Python", "Flask", "MySQL", "HTML/CSS"],
      metrics: [
        { label: "Access Control", value: "RBAC" },
        { label: "DB Structure", value: "Normalized" },
        { label: "Auth Type", value: "Session-based" }
      ],
      github: "https://github.com/DiyaPanjwani09"
    },
    {
      id: "anti-scam-chatbot",
      title: "AI-Based Anti-Scam Chatbot",
      tag: "Natural Language Processing",
      summary: "NLP-powered chatbot helping non-technical/elderly users detect scam calls, phishing, and fraudulent URLs.",
      description: "Developed an NLP-powered chatbot helping non-technical/elderly users detect scam calls, phishing messages, and fraudulent URLs in real time. Trained intent classification models on a curated scam dataset, achieving high accuracy across fraud patterns (lottery, impersonation, fake KYC). Provided actionable advice to prevent users from falling victim to social engineering attacks.",
      stack: ["Python", "NLP", "AI"],
      metrics: [
        { label: "Domain", value: "Cybersecurity" },
        { label: "NLP Models", value: "Intent Classif." },
        { label: "Target Audience", value: "Elderly/Non-Tech" }
      ],
      github: "https://github.com/DiyaPanjwani09"
    },
    {
      id: "ecommerce-sales",
      title: "E-Commerce Sales Analysis Dashboard",
      tag: "Business Intelligence",
      summary: "Multi-page Power BI dashboard analyzing 2M+ sales records to surface top categories, regional trends, return rates, and MoM growth.",
      description: "Designed a multi-page Power BI dashboard analyzing 2M+ sales records, surfacing top categories, regional trends, return rates, and MoM growth metrics. Built dynamic slicers, DAX calculated columns, and custom KPI cards enabling real-time filtering for business users without raw data access. Provided insights that helped optimize stock levels and highlight high-performing regions.",
      stack: ["Power BI", "Advanced Excel"],
      metrics: [
        { label: "Records Analysed", value: "2M+" },
        { label: "Calculations", value: "DAX Measures" },
        { label: "Insights", value: "MoM Growth" }
      ],
      github: "https://github.com/DiyaPanjwani09"
    }
  ],

  education: [
    {
      institution: "Madhav Institute of Technology and Science (MITS)",
      degree: "Bachelor of Technology — Information Technology",
      period: "Sep 2024 — Apr 2028",
      location: "Gwalior, India",
      details: "CGPA: 8.0 | NAAC A++, Deemed University",
      coursework: ["Data Structures & Algorithms (DSA)", "DBMS", "Object-Oriented Programming", "Computer Networks", "Operating Systems"]
    },
    {
      institution: "Sanskar Public School",
      degree: "Senior Secondary (Class XII) — CBSE",
      period: "2022 — 2024",
      location: "Gwalior, Madhya Pradesh",
      details: "Percentage: 89.20%",
      coursework: ["Physics", "Chemistry", "Mathematics", "Computer Science", "English"]
    },
    {
      institution: "Little Angels High School",
      degree: "Secondary (Class X) — CBSE",
      period: "2021 — 2022",
      location: "Gwalior, Madhya Pradesh",
      details: "Percentage: 94.80%",
      coursework: ["Mathematics", "Science", "Social Science", "English", "Hindi"]
    }
  ],

  achievements: [
    {
      title: "AI Synergy Hackathon 2026",
      subtitle: "Winner",
      details: "Gwalior AI Summit 2026, ABV-IIITM Gwalior (Dept. of Engineering Sciences) — March 2026"
    },
    {
      title: "Innovate 2025 Smart Hackathon",
      subtitle: "Competitor",
      details: "MANIT Bhopal, Thapar & Modi Institute | Team Krypto Ninjas — 2025"
    },
    {
      title: "Code Coalescence Hackathon 2K25",
      subtitle: "Student Coordinator",
      details: "MITS Gwalior — Feb 2025"
    },
    {
      title: "Oracle Certified — Data Science",
      subtitle: "Professional Certification",
      details: "Demonstrates competency in data exploration, model training, and analytical reasoning."
    },
    {
      title: "Cisco Certified — Python & Data Analytics",
      subtitle: "Technical Certification",
      details: "Validation of Python programming proficiency, pandas integration, and data cleaning."
    }
  ],

  leadership: [
    {
      role: "Marketing Head",
      organization: "MUN (Model United Nations) Club, MITS Gwalior",
      details: "Led cross-functional planning, delegate outreach, and end-to-end communications for 100+ participants."
    },
    {
      role: "Student Coordinator",
      organization: "Training & Placement Cell, MITS Gwalior",
      details: "Facilitated campus placement drives, liaised with 15+ company recruiters, and organized mock interviews and resume-building sessions."
    }
  ]
};
