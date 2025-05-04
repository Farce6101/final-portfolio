import { motion } from 'framer-motion';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Experience from '../components/sections/Experience';
import Projects from '../components/sections/Projects';
import BlogList from '../components/sections/BlogList';
import Contact from '../components/sections/Contact';

const Home = () => {
  return (
    <motion.div
      className="home-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <section id="home">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Projects />
      </section>
      <section id="blog">
        <BlogList />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </motion.div>
  );
};

export default Home; 