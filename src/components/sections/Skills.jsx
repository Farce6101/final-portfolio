import { motion } from 'framer-motion';
import { FaCode, FaDatabase, FaTools, FaServer } from 'react-icons/fa';

const Skills = () => {
  const skills = [
    {
      category: 'Frontend',
      icon: <FaCode />,
      items: ['React', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS']
    },
    {
      category: 'Backend',
      icon: <FaServer />,
      items: ['Node.js', 'Express', 'Python', 'Django', 'REST APIs']
    },
    {
      category: 'Database',
      icon: <FaDatabase />,
      items: ['MongoDB', 'PostgreSQL', 'MySQL', 'Firebase']
    },
    {
      category: 'Tools & Others',
      icon: <FaTools />,
      items: ['Git', 'Docker', 'AWS', 'CI/CD', 'Testing']
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        <motion.h2 
          className="section-title"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Skills
        </motion.h2>
        
        <div className="skills-grid">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.category}
              className="skill-category"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="skill-icon">{skill.icon}</div>
              <h3>{skill.category}</h3>
              <ul>
                {skill.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills; 