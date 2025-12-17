import React from 'react';
import { motion } from 'framer-motion';

/**
 * Tech Stack Section
 * Showcases the technologies and tools the team uses
 * Based on actual production experience
 */
const TechStack = ({
  badge = "Technology Arsenal",
  title = "Production-Tested",
  titleHighlight = "Tech Stack",
  subtitle = "These are the tools we use daily to build and ship real-world systems. Every technology listed reflects hands-on production experience.",
}) => {
  const techCategories = [
    {
      category: "Frontend",
      technologies: [
        { name: "Angular", icon: "🅰️", experience: "Enterprise SPAs" },
        { name: "React", icon: "⚛️", experience: "Modern web apps" },
        { name: "Flutter", icon: "📱", experience: "Cross-platform mobile" },
        { name: "TypeScript", icon: "🔷", experience: "Type-safe development" },
      ],
    },
    {
      category: "Backend",
      technologies: [
        { name: ".NET Core", icon: "🔵", experience: "Enterprise APIs" },
        { name: "Python", icon: "🐍", experience: "FastAPI services" },
        { name: "Node.js", icon: "🟢", experience: "Serverless functions" },
        { name: "C#", icon: "🔶", experience: "Business logic" },
      ],
    },
    {
      category: "Cloud & Infrastructure",
      technologies: [
        { name: "Azure", icon: "☁️", experience: "Cloud hosting" },
        { name: "Firebase", icon: "🔥", experience: "Backend services" },
        { name: "Docker", icon: "🐳", experience: "Containerization" },
        { name: "CI/CD", icon: "🔄", experience: "Automated deployment" },
      ],
    },
    {
      category: "Database",
      technologies: [
        { name: "CosmosDB", icon: "🌐", experience: "NoSQL at scale" },
        { name: "MongoDB", icon: "🍃", experience: "Document storage" },
        { name: "SQL Server", icon: "💾", experience: "Relational data" },
        { name: "PostgreSQL", icon: "🐘", experience: "Open-source SQL" },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section
      style={{
        padding: 'var(--section-lg) 0',
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="modern-container">
        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            maxWidth: '700px',
            margin: '0 auto var(--space-16)',
          }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'inline-block',
              padding: 'var(--space-2) var(--space-4)',
              background: 'rgba(59, 130, 246, 0.1)',
              borderRadius: 'var(--radius-full)',
              fontSize: 'var(--text-sm)',
              fontWeight: '500',
              color: 'var(--color-primary-600)',
              marginBottom: 'var(--space-4)',
            }}
          >
            {badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            style={{
              fontSize: 'var(--text-4xl)',
              fontWeight: '700',
              color: 'var(--text-primary)',
              marginBottom: 'var(--space-4)',
              lineHeight: '1.2',
            }}
          >
            {title} <span className="modern-gradient-text">{titleHighlight}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            style={{
              fontSize: 'var(--text-lg)',
              color: 'var(--text-secondary)',
              lineHeight: '1.7',
            }}
          >
            {subtitle}
          </motion.p>
        </div>

        {/* Tech Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--space-6)',
          }}
        >
          {techCategories.map((category, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              style={{
                background: 'var(--bg-primary)',
                borderRadius: 'var(--radius-2xl)',
                padding: 'var(--space-8)',
                border: '1px solid var(--border-light)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              <h3
                style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: '600',
                  color: 'var(--text-primary)',
                  marginBottom: 'var(--space-6)',
                  paddingBottom: 'var(--space-3)',
                  borderBottom: '2px solid var(--color-primary-500)',
                }}
              >
                {category.category}
              </h3>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-4)',
                }}
              >
                {category.technologies.map((tech, techIdx) => (
                  <div
                    key={techIdx}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      background: 'var(--bg-secondary)',
                      borderRadius: 'var(--radius-lg)',
                      transition: 'transform var(--transition-default)',
                    }}
                    className="tech-item"
                  >
                    <span style={{ fontSize: '1.5rem' }}>{tech.icon}</span>
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          fontSize: 'var(--text-base)',
                          fontWeight: '600',
                          color: 'var(--text-primary)',
                        }}
                      >
                        {tech.name}
                      </div>
                      <div
                        style={{
                          fontSize: 'var(--text-sm)',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        {tech.experience}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Hover Effect */}
      <style>{`
        .tech-item:hover {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
};

export default TechStack;
