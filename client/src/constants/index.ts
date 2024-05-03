const statusButtonColors = {
  applied: "bg-blue-500",
  interview: "bg-green-500",
  shortlisted: "bg-yellow-500",
  rejected: "bg-red-500",
  underReview: "bg-gray-500",
  hired: "bg-cyan-500",
};

const cancelReasons = [
  "Scheduling Conflicts",
  "Job Offer Acceptance",
  "Changed Requirements",
  "Company Changes",
  "Preparation Issues",
  "Location Constraints",
  "Weather Conditions",
  "Unforeseen Circumstances",
  "Communication Problems",
  "Technical Issues",
];

const languageVersions: Record<string, string> = {
  javascript: "18.15.0",
  typescript: "5.0.3",
  python: "3.10.0",
  java: "15.0.2",
  csharp: "6.12.0",
  php: "8.2.3",
};

const availableLanguages: Record<string, string> = {
  javascript: "js",
  cpp: "cpp",
  python: "py",
  php: "php",
};

const codeSnippets: Record<string, string> = {
  javascript: `\nfunction greet(name) {\n\tconsole.log("Hello, " + name + "!");\n}\n\ngreet("Carreralink javascript");\n`,
  python: `\ndef greet(name):\n\tprint("Hello, " + name + "!")\n\ngreet("Carreralink python")\n`,
  php: "<?php\n\n$name = 'Carreralink php';\necho $name;\n",
  cpp: '#include <iostream>\n\nint main() {\n\tstd::cout << "Hello Carreralink C++" << std::endl;\n\treturn 0;\n}\n',
};

export {
  statusButtonColors,
  cancelReasons,
  languageVersions,
  codeSnippets,
  availableLanguages,
};
