export const mockDatabase = {
  "/api/v1/profile": {
    status: 200,
    data: {
      name: "Sooraj Parakkattil Ravi",
      title: "Senior Software Engineer",
      location: "Coventry, UK",
      email: "soorajparakkattil@gmail.com",
      phone: "+44 8281144538",
      links: {
        linkedin: "https://linkedin.com",
        portfolio: "https://sooparkr.com"
      },
      summary: "AWS Certified Solutions Architect & SAFe® 6 Product Owner with 5+ years of experience in architecting high-performance backend systems, designing RESTful APIs, and leading migrations to microservices."
    }
  },
  "/api/v1/skills": {
    status: 200,
    data: {
      languages: ["Python", "JavaScript", "SQL", "TypeScript", "Go"],
      backend: ["Django", "Django REST Framework", "Flask", "FastAPI", "Microservices", "PostgreSQL", "MySQL", "Redis", "MongoDB", "ElasticSearch"],
      infrastructure: ["AWS (Certified Solutions Architect)", "GCP", "Docker", "Kubernetes", "Terraform"],
      tools: ["Celery", "RabbitMQ", "Kafka", "Selenium", "Git", "Linux/Unix", "Playwright"],
      frontend: ["Vue.js", "Nuxt.js", "HTML", "CSS", "Tailwind"]
    }
  },
  "/api/v1/experience": {
    status: 200,
    data: [
      {
        company: "KnowBe4",
        location: "Remote, UK",
        role: "Senior Software Engineer",
        period: "Oct 2025 – Present",
        highlights: [
          "Develop enterprise software utilizing the KnowBe4 Software Development Lifecycle (SDLC) and Agile methodologies.",
          "Design and implement high-performance database and backend solutions, reporting directly to the Principal Database Architect for complex technical issues.",
          "Provide technical direction, mentorship, and leadership for sub-projects and engineering team members.",
          "Help translate corporate strategic goals into actionable operational plans and technical architectures.",
          "Provide cross-functional coordination across engineering and product boundaries within the company."
        ]
      },
      {
        company: "Obso Automation",
        location: "Stafford, UK",
        role: "Product Lead Engineer",
        period: "Sept 2022 – Oct 2025",
        highlights: [
          "Architected and led migration from monolithic legacy CRM to microservices architecture, scaling and improving system reliability with 99.95% uptime.",
          "Designed RESTful APIs with Django REST Framework that handle 1M+ daily requests with average response time <100ms, supporting real-time data flows across multiple platforms.",
          "Engineered high-performance data processing pipeline processing 50+ supplier integrations, optimizing database queries to reduce response time by 90%.",
          "Implemented robust CI/CD pipeline with automated testing, reducing deployment issues by 75% and enabling 3x more frequent releases.",
          "Built scalable backend for quoting platform with Redis caching layer, achieving sub-2-minute response time for complex multi-supplier quotes.",
          "Optimized PostgreSQL database operations resulting in 10X performance improvement through indexing strategies, query optimization, and database sharding.",
          "Led weekly code reviews and mentored 3 junior engineers, establishing engineering best practices and test-driven development methodology."
        ]
      },
      {
        company: "CIED Technologies",
        location: "Kochi, India",
        role: "Backend Engineer",
        period: "June 2018 – July 2021",
        highlights: [
          "Designed and implemented horizontally scalable Django/PostgreSQL backend system supporting 10,000+ concurrent users across agricultural sustainability applications.",
          "Engineered ML-driven routing service with custom Django middleware and optimized algorithms, achieving 10x performance improvement and 60% reduction in API costs.",
          "Architected multi-cloud backend infrastructure across AWS, Azure, and Digital Ocean with automated failover, ensuring 99.9% availability for data-intensive applications.",
          "Implemented Celery task queue system for asynchronous processing of large datasets, reducing processing time by 75%.",
          "Designed database schema with advanced PostgreSQL features (partitioning, materialized views), improving query performance by 400% for analytical workloads."
        ]
      }
    ]
  }
,
  "/api/v1/education": {
    status: 200,
    data: [
      {
        institution: "Keele University",
        location: "Staffordshire, UK",
        degree: "MSc Advanced Computer Science",
        grade: "Distinction (Top of the class 2022)",
        period: "December 2022",
        highlights: [
          "British Council GREAT Scholarship recipient.",
          "Thesis: Semantic Network analysis of Synthetic Biological Experiments using transformers for Relation Extraction.",
          "Relevant Coursework: System Design, User Interaction Design, AI, Analytics, Cloud Computing"
        ]
      },
      {
        institution: "Cochin University of Science and Technology",
        location: "Kerala, India",
        degree: "B.Tech Computer Science and Engineering",
        period: "June 2018"
      }
    ]
  },
  "/api/v1/projects": {
    status: 200,
    data: [
      {
        name: "OBSOURCE",
        type: "Professional",
        period: "Current",
        description: "Architected scalable web scraping backend with Redis-based rate limiting and queueing system, processing 40+ supplier websites daily.",
        highlights: [
          "Implemented PostgreSQL optimizations (partitioning, indexing, query optimization) enabling sub-100ms queries across 2M+ data points.",
          "Designed RESTful API with Django REST Framework, serving complex aggregated data with comprehensive test coverage (90%+)."
        ]
      },
      {
        name: "OBSO LINK",
        type: "Professional",
        period: "September 2022",
        description: "Led backend development for internal software platform, implementing Django REST Framework APIs with comprehensive test coverage.",
        highlights: [
          "Engineered data synchronization pipeline between PostgreSQL and WordPress, scaling to handle 100K+ products.",
          "Designed and implemented background task processing system with Celery, Redis, and RabbitMQ for high-throughput operations."
        ]
      },
      {
        name: "Open Translate",
        type: "Personal",
        period: "April 2024",
        description: "Developed translation management backend with Django REST Framework, implementing JWT authentication and role-based access control.",
        highlights: [
          "Designed database schema optimized for fast retrieval of multilingual content with efficient caching strategies.",
          "Implemented API rate limiting, request validation, and comprehensive test suite with 90%+ coverage."
        ]
      },
      {
        name: "Intstu (intstu.com)",
        type: "Personal",
        period: "January 2025",
        description: "Developed Educational AI assistant that dealt with over 10,000 international institutes.",
        highlights: [
          "Scraped more than 10 million relevant pages using raspberry pi utilizing efficient scraping strategies and efficient algorithms.",
          "Created efficient RAG pipeline and self-configuring retrieval strategies that changes with institutes."
        ]
      },
      {
        name: "Paxable (paxable.app)",
        type: "Personal",
        period: "September 2025",
        description: "Task sharing platform made for ADHD brains.",
        highlights: [
          "Research & Development Phase."
        ]
      }
    ]
  },
  "/api/v1/certifications": {
    status: 200,
    data: [
      { name: "AWS Certified Solutions Architect - Associate", issuer: "Amazon Web Services" },
      { name: "Certified SAFe® 6 Product Owner/Product Manager", issuer: "Scaled Agile" },
      { name: "ISC2 Certified in Cybersecurity (CC)", issuer: "ISC2" },
      { name: "AWS Certified Cloud Practitioner", issuer: "Amazon Web Services" },
      { name: "Blockchain Basics", issuer: "Coursera / CUSAT" }
    ]
  }
};
