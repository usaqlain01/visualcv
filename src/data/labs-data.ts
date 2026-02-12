export interface Lab {
    id: string;
    title: string;
    duration: string;
    prereqs: string[];
    summary: string;
    status: "not-started" | "in-progress" | "complete";
  }
  
  export interface Topic {
    id: string;
    letter: string;
    name: string;
    category: TopicCategory;
    difficulty: number;
    jobDemand: number;
    timeToMidLevel: string;
    description: string;
    isMomentumStarter: boolean;
    momentumOrder?: number;
    labs: Lab[];
  }
  
  export type TopicCategory =
    | "foundations"
    | "core-architecture"
    | "orchestration"
    | "frameworks"
    | "data-retrieval"
    | "integration-deployment"
    | "specializations";
  
  export const categoryLabels: Record<TopicCategory, string> = {
    foundations: "Foundations",
    "core-architecture": "Core Architecture",
    orchestration: "Orchestration",
    frameworks: "Frameworks",
    "data-retrieval": "Data & Retrieval",
    "integration-deployment": "Integration & Deployment",
    specializations: "Specializations",
  };
  
  export const categoryColors: Record<TopicCategory, string> = {
    foundations: "emerald",
    "core-architecture": "sky",
    orchestration: "violet",
    frameworks: "amber",
    "data-retrieval": "rose",
    "integration-deployment": "blue",
    specializations: "teal",
  };
  
  export const topics: Topic[] = [
    // ── Foundations ──
    {
      id: "topic-a",
      letter: "A",
      name: "Claude Code Power Use",
      category: "foundations",
      difficulty: 2,
      jobDemand: 8,
      timeToMidLevel: "2 weeks",
      description:
        "Using Claude Code as a coding partner that navigates your codebase, runs tests, debugs across files, and handles complex multi-step development tasks.",
      isMomentumStarter: true,
      momentumOrder: 1,
      labs: [
        {
          id: "a1",
          title: "First Pair Programming Session",
          duration: "2-3 hours",
          prereqs: [],
          summary:
            "Open Claude Code in an existing project. Add a new feature, watch how it navigates your codebase and matches your style, then refactor a messy function.",
          status: "not-started",
        },
        {
          id: "a2",
          title: "Full Feature From English",
          duration: "4-6 hours",
          prereqs: ["A1"],
          summary:
            "Describe a medium-complexity feature entirely in plain English. Let Claude Code build it end-to-end while you review, redirect, and approve.",
          status: "not-started",
        },
        {
          id: "a3",
          title: "The Autonomy Experiment",
          duration: "1 day",
          prereqs: ["A2"],
          summary:
            "Give Claude Code a complex task with multiple sub-tasks and let it plan its own approach. Evaluate self-direction quality and where it needed you.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-b",
      letter: "B",
      name: "Prompt Engineering at Systems Level",
      category: "foundations",
      difficulty: 3,
      jobDemand: 9,
      timeToMidLevel: "3 weeks",
      description:
        "Designing instruction sets that control how AI agents behave in production: system prompts for personality, boundaries, output formats, error handling, and tool-use strategies.",
      isMomentumStarter: true,
      momentumOrder: 2,
      labs: [
        {
          id: "b1",
          title: "The Soul File",
          duration: "1.5-2 hours",
          prereqs: [],
          summary:
            "Write a system prompt for an AI with a specific personality and rules. Test consistency across 10 different types of questions.",
          status: "not-started",
        },
        {
          id: "b2",
          title: "The Format Enforcer",
          duration: "3-4 hours",
          prereqs: ["B1"],
          summary:
            "Build a system prompt that forces JSON schema output. Test with 20 inputs including edge cases. Iterate until 95%+ compliance.",
          status: "not-started",
        },
        {
          id: "b3",
          title: "The Multi-Skill Prompt Composer",
          duration: "1 day",
          prereqs: ["B2"],
          summary:
            "Create 3 separate skill prompt fragments and build a system that composes them into a single prompt without conflicts.",
          status: "not-started",
        },
      ],
    },
  
    // ── Core Architecture ──
    {
      id: "topic-c",
      letter: "C",
      name: "Tool Use and Function Calling",
      category: "core-architecture",
      difficulty: 2,
      jobDemand: 9,
      timeToMidLevel: "2 weeks",
      description:
        "The mechanism by which an AI model interacts with the outside world. Defining tools, handling results, and chaining multiple calls for complex tasks.",
      isMomentumStarter: true,
      momentumOrder: 3,
      labs: [
        {
          id: "c1",
          title: "My First Tool",
          duration: "2 hours",
          prereqs: ["A1"],
          summary:
            "Define a single tool (weather, file reader, calculator). Make one API call where the model decides to use your tool on its own.",
          status: "not-started",
        },
        {
          id: "c2",
          title: "The Three-Tool Agent",
          duration: "4-6 hours",
          prereqs: ["C1"],
          summary:
            "Give your agent three tools that work together. Ask it to chain: list, find, read, modify, write.",
          status: "not-started",
        },
        {
          id: "c3",
          title: "Tool Failure and Recovery",
          duration: "1 day",
          prereqs: ["C2"],
          summary:
            "Deliberately make tools fail. Add error handling and retry mechanisms. Build production-quality resilience.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-d",
      letter: "D",
      name: "Configuration-Driven Architecture",
      category: "core-architecture",
      difficulty: 2,
      jobDemand: 7,
      timeToMidLevel: "1 week",
      description:
        "Defining agent behaviors in configuration files rather than code. Swap personalities, tools, and models by changing config, not rewriting software.",
      isMomentumStarter: false,
      labs: [
        {
          id: "d1",
          title: "Config-Powered Personality Swap",
          duration: "2 hours",
          prereqs: ["B1"],
          summary:
            "Externalize your soul file into YAML. Create 3 personality configs. Switch between them with zero code changes.",
          status: "not-started",
        },
        {
          id: "d2",
          title: "The Skill Loader",
          duration: "4-6 hours",
          prereqs: ["D1", "C2"],
          summary:
            "Build a /skills directory where each skill is a manifest.yaml. Build a loader that assembles them into a complete agent config.",
          status: "not-started",
        },
        {
          id: "d3",
          title: "Environment-Based Agent Profiles",
          duration: "1 day",
          prereqs: ["D2"],
          summary:
            "Same codebase runs as different agents based on environment variable. PROFILE=coder vs PROFILE=researcher vs PROFILE=ops.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-e",
      letter: "E",
      name: "Persistent Agentic Memory",
      category: "core-architecture",
      difficulty: 3,
      jobDemand: 8,
      timeToMidLevel: "3 weeks",
      description:
        "Building systems that store, retrieve, and manage information across sessions. Short-term, medium-term, and long-term memory for AI agents.",
      isMomentumStarter: true,
      momentumOrder: 4,
      labs: [
        {
          id: "e1",
          title: "The Remember File",
          duration: "2 hours",
          prereqs: ["B1"],
          summary:
            "After each conversation, append key facts to memory.md. Before each new conversation, inject that file into the prompt.",
          status: "not-started",
        },
        {
          id: "e2",
          title: "Structured Memory With Retrieval",
          duration: "4-6 hours",
          prereqs: ["E1"],
          summary:
            "Replace flat file with structured JSON. Build retrieval that injects only relevant memories based on the current query.",
          status: "not-started",
        },
        {
          id: "e3",
          title: "Memory Decay and Conflict Resolution",
          duration: "1 day",
          prereqs: ["E2"],
          summary:
            "Add timestamps and decay. Handle contradictions where newer facts should override older ones.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-f",
      letter: "F",
      name: "MCP and API Design",
      category: "core-architecture",
      difficulty: 3,
      jobDemand: 8,
      timeToMidLevel: "3 weeks",
      description:
        "Model Context Protocol is the universal plug that lets any model connect to any tool. Learn to consume, build, and compose MCP servers.",
      isMomentumStarter: true,
      momentumOrder: 5,
      labs: [
        {
          id: "f1",
          title: "Using an Existing MCP Server",
          duration: "2 hours",
          prereqs: ["A1"],
          summary:
            "Install an existing MCP server and connect it to Claude Code. Use it to accomplish a task with zero custom code.",
          status: "not-started",
        },
        {
          id: "f2",
          title: "Build Your Own MCP Server",
          duration: "4-6 hours",
          prereqs: ["F1", "C2"],
          summary:
            "Build a simple MCP server exposing a custom tool like a task list manager. Connect it to Claude.",
          status: "not-started",
        },
        {
          id: "f3",
          title: "Multi-Server Agent",
          duration: "1 day",
          prereqs: ["F2"],
          summary:
            "Connect 3+ MCP servers simultaneously. Give your agent a complex task requiring multiple tools together.",
          status: "not-started",
        },
      ],
    },
  
    // ── Orchestration ──
    {
      id: "topic-g",
      letter: "G",
      name: "Agent Lifecycle Management",
      category: "orchestration",
      difficulty: 3,
      jobDemand: 7,
      timeToMidLevel: "3 weeks",
      description:
        "Spawning agents with the right config, monitoring them, restarting on failure, managing resources, and handling graceful shutdown.",
      isMomentumStarter: false,
      labs: [
        {
          id: "g1",
          title: "The Mortal Agent",
          duration: "2-3 hours",
          prereqs: ["C1"],
          summary:
            "Build an agent with a strict token budget and timeout. Verify it terminates gracefully when limits are exceeded.",
          status: "not-started",
        },
        {
          id: "g2",
          title: "Health Check and Restart",
          duration: "4-6 hours",
          prereqs: ["G1"],
          summary:
            "Build a supervisor that spawns an agent, pings it, and restarts on failure. Add a restart counter with max attempts.",
          status: "not-started",
        },
        {
          id: "g3",
          title: "The Agent Nursery",
          duration: "1 day",
          prereqs: ["G2"],
          summary:
            "Manage 3 agents simultaneously: spawn, monitor, collect outputs, shut down. Display a status dashboard.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-h",
      letter: "H",
      name: "Multi-Model Strategy and Routing",
      category: "orchestration",
      difficulty: 3,
      jobDemand: 8,
      timeToMidLevel: "3 weeks",
      description:
        "Knowing which model to use for which task and building the routing layer. Haiku for speed, Opus for reasoning, Sonnet for balance.",
      isMomentumStarter: false,
      labs: [
        {
          id: "h1",
          title: "The Model Menu",
          duration: "2 hours",
          prereqs: ["B1"],
          summary:
            "Build an abstraction layer that routes to different APIs. Call the same prompt against 3 models and compare.",
          status: "not-started",
        },
        {
          id: "h2",
          title: "The Cost-Aware Router",
          duration: "4-6 hours",
          prereqs: ["H1"],
          summary:
            "Add a routing table mapping task types to models. Build a classifier that picks the right model. Log and compare costs.",
          status: "not-started",
        },
        {
          id: "h3",
          title: "Fallback Chains and Offline Mode",
          duration: "1 day",
          prereqs: ["H2"],
          summary:
            "Add fallback behavior across providers. Simulate outages and verify seamless failover including local models.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-i",
      letter: "I",
      name: "AI Orchestration & Multi-Agent Patterns",
      category: "orchestration",
      difficulty: 4,
      jobDemand: 9,
      timeToMidLevel: "5 weeks",
      description:
        "Breaking complex tasks into subtasks and coordinating multiple agents. The master plans, spawns sub-agents, monitors progress, and synthesizes results.",
      isMomentumStarter: false,
      labs: [
        {
          id: "i1",
          title: "Two Agents, One Task",
          duration: "2-3 hours",
          prereqs: ["G1", "C2"],
          summary:
            "Master agent splits a task into two subtasks, sends each to a sub-agent, collects and combines results.",
          status: "not-started",
        },
        {
          id: "i2",
          title: "Parallel Fan-Out",
          duration: "4-6 hours",
          prereqs: ["I1"],
          summary:
            "Sub-agents run in parallel. Send 3 research agents out simultaneously, collect results, synthesize with timeout handling.",
          status: "not-started",
        },
        {
          id: "i3",
          title: "The Supervisor Loop",
          duration: "1 day",
          prereqs: ["I2"],
          summary:
            "Add quality checking. Master reviews sub-agent output and sends work back with feedback if insufficient. Cap at 3 iterations.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-j",
      letter: "J",
      name: "Background and Event-Driven AI",
      category: "orchestration",
      difficulty: 3,
      jobDemand: 7,
      timeToMidLevel: "3 weeks",
      description:
        "AI that watches for events and acts proactively. File watchers, scheduled agents, and heartbeat systems.",
      isMomentumStarter: false,
      labs: [
        {
          id: "j1",
          title: "The File Watcher Agent",
          duration: "2 hours",
          prereqs: ["C1"],
          summary:
            "Watch a directory for new files. When a file appears, an AI agent reads it and produces a summary automatically.",
          status: "not-started",
        },
        {
          id: "j2",
          title: "Morning Briefing Agent",
          duration: "4-6 hours",
          prereqs: ["J1", "E1"],
          summary:
            "Scheduled agent that reads your task list, reviews yesterday's memory log, and produces a daily briefing.",
          status: "not-started",
        },
        {
          id: "j3",
          title: "The Heartbeat",
          duration: "1 day",
          prereqs: ["J2", "G2"],
          summary:
            "A configurable interval loop where a lightweight model checks system status, agent health, and decides whether to act.",
          status: "not-started",
        },
      ],
    },
  
    // ── Frameworks ──
    {
      id: "topic-k",
      letter: "K",
      name: "LangChain",
      category: "frameworks",
      difficulty: 3,
      jobDemand: 7,
      timeToMidLevel: "2 weeks",
      description:
        "Pre-built abstractions for chains, agents, memory, and retrievers. Learn when to use it and when your hand-built version is better.",
      isMomentumStarter: false,
      labs: [
        {
          id: "k1",
          title: "LangChain in 2 Hours",
          duration: "2 hours",
          prereqs: ["C2", "E1"],
          summary:
            "Build a simple LangChain agent with one tool and memory. Compare to what you built by hand.",
          status: "not-started",
        },
        {
          id: "k2",
          title: "Chain Composition",
          duration: "4-6 hours",
          prereqs: ["K1"],
          summary:
            "Build a multi-step chain: input, research, analysis, output. Compare to manual orchestration.",
          status: "not-started",
        },
        {
          id: "k3",
          title: "LangChain RAG Pipeline",
          duration: "1 day",
          prereqs: ["K2", "N1"],
          summary:
            "Build a RAG application using LangChain's retriever abstractions. Load, chunk, embed, and query documents.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-l",
      letter: "L",
      name: "CrewAI",
      category: "frameworks",
      difficulty: 2,
      jobDemand: 6,
      timeToMidLevel: "2 weeks",
      description:
        "Multi-agent collaboration framework. Define agents with roles and backstories, organize them into crews that work together.",
      isMomentumStarter: false,
      labs: [
        {
          id: "l1",
          title: "Your First Crew",
          duration: "2 hours",
          prereqs: ["I1"],
          summary:
            "Define 3 CrewAI agents (researcher, writer, editor) and a task. Run the crew and watch them collaborate.",
          status: "not-started",
        },
        {
          id: "l2",
          title: "Custom Tools in CrewAI",
          duration: "4-6 hours",
          prereqs: ["L1", "C2"],
          summary:
            "Add custom tools (file access, API calls, DB queries) to your CrewAI agents.",
          status: "not-started",
        },
        {
          id: "l3",
          title: "CrewAI vs Your Orchestrator",
          duration: "1 day",
          prereqs: ["L2", "I3"],
          summary:
            "Same complex task on both CrewAI and your hand-built orchestrator. Document the tradeoffs.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-m",
      letter: "M",
      name: "AutoGen",
      category: "frameworks",
      difficulty: 3,
      jobDemand: 6,
      timeToMidLevel: "3 weeks",
      description:
        "Multi-agent conversations where agents refine outputs through back-and-forth dialogue. Excels at iterative refinement.",
      isMomentumStarter: false,
      labs: [
        {
          id: "m1",
          title: "Two Agents Debating",
          duration: "2-3 hours",
          prereqs: ["I1"],
          summary:
            "Set up two agents with different perspectives on a topic. Watch conversation unfold and consensus emerge.",
          status: "not-started",
        },
        {
          id: "m2",
          title: "Code Review Conversation",
          duration: "4-6 hours",
          prereqs: ["M1"],
          summary:
            "One agent writes code, another reviews it. They iterate until the reviewer approves. Add a test runner agent.",
          status: "not-started",
        },
        {
          id: "m3",
          title: "AutoGen vs CrewAI vs Manual",
          duration: "1 day",
          prereqs: ["M2", "L3"],
          summary:
            "Same task across all three approaches. Document which works best for which types of tasks.",
          status: "not-started",
        },
      ],
    },
  
    // ── Data & Retrieval ──
    {
      id: "topic-n",
      letter: "N",
      name: "RAG (Retrieval-Augmented Generation)",
      category: "data-retrieval",
      difficulty: 3,
      jobDemand: 10,
      timeToMidLevel: "4 weeks",
      description:
        "Giving AI access to external knowledge by retrieving relevant documents at query time. The foundation of every 'chat with your data' product.",
      isMomentumStarter: false,
      labs: [
        {
          id: "n1",
          title: "Chat With Your Docs",
          duration: "2-3 hours",
          prereqs: ["C1"],
          summary:
            "Chunk markdown files, do basic keyword matching, inject relevant chunks into prompts. Get answers grounded in YOUR documents.",
          status: "not-started",
        },
        {
          id: "n2",
          title: "Vector Database Integration",
          duration: "4-6 hours",
          prereqs: ["N1"],
          summary:
            "Replace in-memory storage with ChromaDB. Proper embeddings, proper similarity search across 50+ documents.",
          status: "not-started",
        },
        {
          id: "n3",
          title: "RAG Agent With Source Citations",
          duration: "1 day",
          prereqs: ["N2", "C2"],
          summary:
            "Full RAG agent that retrieves, answers, cites sources, and admits when it doesn't have the information.",
          status: "not-started",
        },
      ],
    },
  
    // ── Integration & Deployment ──
    {
      id: "topic-o",
      letter: "O",
      name: "Hugging Face Integration",
      category: "integration-deployment",
      difficulty: 3,
      jobDemand: 7,
      timeToMidLevel: "3 weeks",
      description:
        "The GitHub of AI models. Find, download, run, and integrate thousands of specialized open-source models into your workflows.",
      isMomentumStarter: false,
      labs: [
        {
          id: "o1",
          title: "Your First HF Model",
          duration: "2 hours",
          prereqs: [],
          summary:
            "Use the free inference API: sentiment analysis, text summarization, and image classification. Three capabilities, zero local setup.",
          status: "not-started",
        },
        {
          id: "o2",
          title: "Local Model, Your Machine",
          duration: "4-6 hours",
          prereqs: ["O1"],
          summary:
            "Download and run a small model locally with Ollama. Compare quality, speed, and cost to API models.",
          status: "not-started",
        },
        {
          id: "o3",
          title: "HF Model as Agent Tool",
          duration: "1 day",
          prereqs: ["O2", "C2"],
          summary:
            "Integrate a specialized HF model as a tool. Your Claude agent delegates specific tasks to a local specialist model.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-p",
      letter: "P",
      name: "CI/CD and MLOps for AI",
      category: "integration-deployment",
      difficulty: 3,
      jobDemand: 8,
      timeToMidLevel: "4 weeks",
      description:
        "Automating testing, building, and deploying AI-powered applications. Version control for prompts, automated eval, containerized deployment.",
      isMomentumStarter: false,
      labs: [
        {
          id: "p1",
          title: "Git-Controlled Agent Config",
          duration: "2 hours",
          prereqs: ["D2"],
          summary:
            "Put agent configuration in git. Make changes, commit, deploy by pulling new config. Version-controlled AI behavior.",
          status: "not-started",
        },
        {
          id: "p2",
          title: "Automated Prompt Testing",
          duration: "4-6 hours",
          prereqs: ["P1", "S1"],
          summary:
            "Write 10 test cases with expected outputs. Build a script that runs tests and reports pass/fail before deployment.",
          status: "not-started",
        },
        {
          id: "p3",
          title: "Docker Deployment Pipeline",
          duration: "1 day",
          prereqs: ["P2"],
          summary:
            "Containerize your agent. Build a CI pipeline: run tests, build container, push, deploy. Config change to live in one push.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-q",
      letter: "Q",
      name: "TailScale & Distributed AI Networking",
      category: "integration-deployment",
      difficulty: 2,
      jobDemand: 5,
      timeToMidLevel: "2 weeks",
      description:
        "Secure private networks between devices for distributed agent systems. Your master agent on desktop, sub-agents on cloud GPUs.",
      isMomentumStarter: false,
      labs: [
        {
          id: "q1",
          title: "Connect Two Machines",
          duration: "1-2 hours",
          prereqs: [],
          summary:
            "Install TailScale on two devices and ping between them. You now have a private network.",
          status: "not-started",
        },
        {
          id: "q2",
          title: "Remote Agent Execution",
          duration: "4-6 hours",
          prereqs: ["Q1", "G1"],
          summary:
            "Run a sub-agent on a remote machine via TailScale. Send tasks from your local master and receive results.",
          status: "not-started",
        },
        {
          id: "q3",
          title: "Hybrid Local/Cloud Agent Mesh",
          duration: "1 day",
          prereqs: ["Q2", "H2"],
          summary:
            "Route lightweight tasks locally and heavy tasks to cloud GPUs, all over TailScale. Dynamic routing by requirements.",
          status: "not-started",
        },
      ],
    },
  
    // ── Specializations ──
    {
      id: "topic-r",
      letter: "R",
      name: "Model Fine-Tuning and Customization",
      category: "specializations",
      difficulty: 4,
      jobDemand: 6,
      timeToMidLevel: "5 weeks",
      description:
        "Training existing models further on your specific data. Know when fine-tuning a small model beats prompting a large one.",
      isMomentumStarter: false,
      labs: [
        {
          id: "r1",
          title: "Fine-Tuning Feeling",
          duration: "2-3 hours",
          prereqs: ["O2"],
          summary:
            "Use a hosted fine-tuning service with 50 example pairs. Compare fine-tuned vs base model on your specific task.",
          status: "not-started",
        },
        {
          id: "r2",
          title: "LoRA on a Local Model",
          duration: "4-6 hours",
          prereqs: ["R1"],
          summary:
            "Fine-tune a small local model using LoRA. Much cheaper than full fine-tuning. Train and compare.",
          status: "not-started",
        },
        {
          id: "r3",
          title: "Fine-Tuned Model as Agent Specialist",
          duration: "1 day",
          prereqs: ["R2", "C2"],
          summary:
            "Integrate your fine-tuned model as a specialized tool. Main agent delegates specific tasks to your custom specialist.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-s",
      letter: "S",
      name: "Evaluation and Benchmarking",
      category: "specializations",
      difficulty: 3,
      jobDemand: 8,
      timeToMidLevel: "3 weeks",
      description:
        "Systematic measurement of AI system quality: accuracy, reliability, speed, cost, safety. Data-driven confidence in your systems.",
      isMomentumStarter: false,
      labs: [
        {
          id: "s1",
          title: "10 Test Cases",
          duration: "2 hours",
          prereqs: ["B2"],
          summary:
            "Write 10 test cases with pass/fail criteria. Run them, calculate pass rate. Change the prompt and measure improvement.",
          status: "not-started",
        },
        {
          id: "s2",
          title: "LLM-as-Judge",
          duration: "4-6 hours",
          prereqs: ["S1"],
          summary:
            "Use a second LLM to judge the first LLM's output on defined criteria. Compare to your human judgment and calibrate.",
          status: "not-started",
        },
        {
          id: "s3",
          title: "Regression Testing Dashboard",
          duration: "1 day",
          prereqs: ["S2"],
          summary:
            "Automated eval pipeline that runs on every config change. Visualize scores over time to catch regressions.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-t",
      letter: "T",
      name: "AI Vision",
      category: "specializations",
      difficulty: 3,
      jobDemand: 7,
      timeToMidLevel: "3 weeks",
      description:
        "Integrating image and video understanding into agent systems. Screenshot analysis, document processing, visual QA.",
      isMomentumStarter: false,
      labs: [
        {
          id: "t1",
          title: "Screenshot Analyzer",
          duration: "2 hours",
          prereqs: ["C1"],
          summary:
            "Send a screenshot to a vision API. Build a tool that takes a screenshot and returns structured descriptions.",
          status: "not-started",
        },
        {
          id: "t2",
          title: "Visual QA Agent",
          duration: "4-6 hours",
          prereqs: ["T1", "C2"],
          summary:
            "Agent with take-screenshot and analyze-image tools. Check if pages render correctly, read data from chart images.",
          status: "not-started",
        },
        {
          id: "t3",
          title: "Document Processing Pipeline",
          duration: "1 day",
          prereqs: ["T2"],
          summary:
            "Process photos of documents (receipts, invoices, notes). Extract structured data using vision AI. Measure accuracy.",
          status: "not-started",
        },
      ],
    },
    {
      id: "topic-u",
      letter: "U",
      name: "AI Voice",
      category: "specializations",
      difficulty: 3,
      jobDemand: 7,
      timeToMidLevel: "3 weeks",
      description:
        "Speech-to-text, text-to-speech, and conversational voice interfaces. Let users talk to your agents and hear responses.",
      isMomentumStarter: false,
      labs: [
        {
          id: "u1",
          title: "Voice In, Text Out",
          duration: "2 hours",
          prereqs: [],
          summary:
            "Use STT to transcribe audio and TTS to speak text aloud. Both directions of the voice pipeline working.",
          status: "not-started",
        },
        {
          id: "u2",
          title: "Talk to Your Agent",
          duration: "4-6 hours",
          prereqs: ["U1", "C1"],
          summary:
            "Wire STT to your agent to TTS in a loop. Speak a question, get a spoken answer. End-to-end voice interaction.",
          status: "not-started",
        },
        {
          id: "u3",
          title: "Meeting Summarizer",
          duration: "1 day",
          prereqs: ["U2"],
          summary:
            "Transcribe a meeting recording, extract action items and decisions, produce a structured summary.",
          status: "not-started",
        },
      ],
    },
  ];
  
  // Helper to get topics by category
  export function getTopicsByCategory(category: TopicCategory): Topic[] {
    return topics.filter((t) => t.category === category);
  }
  
  // Helper to get momentum starters in order
  export function getMomentumStarters(): Topic[] {
    return topics
      .filter((t) => t.isMomentumStarter)
      .sort((a, b) => (a.momentumOrder ?? 0) - (b.momentumOrder ?? 0));
  }
  
  // All categories in display order
  export const categoryOrder: TopicCategory[] = [
    "foundations",
    "core-architecture",
    "orchestration",
    "frameworks",
    "data-retrieval",
    "integration-deployment",
    "specializations",
  ];