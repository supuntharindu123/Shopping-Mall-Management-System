import React, { useState, useEffect } from "react";
import Mall from "../../assets/Mall05.jpg";
import MallImg from "../../assets/Mall06.jpg";
import MallImgs from "../../assets/Mall07.jpg";
import MallImgss from "../../assets/Mall08.jpg";
import MallImages from "../../assets/Mall09.jpg";
import MallImagess from "../../assets/Mall10.png";
import Logo from "../../assets/CA01.jpg";
import { FaShoppingBag, FaUserFriends, FaChartLine, FaMobile } from "react-icons/fa";
import { motion } from "framer-motion";

const HomePage = () => {
  const [currentImage, setCurrentImage] = useState(0);
  const images = [Mall, MallImg, MallImgs];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    {
      icon: <FaShoppingBag className="w-8 h-8" />,
      title: "Smart Shopping",
      description: "Experience seamless shopping with our AI-powered recommendations"
    },
    {
      icon: <FaUserFriends className="w-8 h-8" />,
      title: "Membership Benefits",
      description: "Exclusive rewards and special offers for our valued members"
    },
    {
      icon: <FaChartLine className="w-8 h-8" />,
      title: "Real-time Analytics",
      description: "Track your shopping patterns and maximize rewards"
    },
    {
      icon: <FaMobile className="w-8 h-8" />,
      title: "Mobile Access",
      description: "Manage everything from your smartphone, anywhere, anytime"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <motion.section 
        className="relative h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.img
          key={currentImage}
          src={images[currentImage]}
          alt="Mall"
          className="w-full h-full object-cover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <img src={Logo} alt="Crystal Arcade" className="w-32 mb-8" />
          <h1 className="text-6xl font-bold mb-4 text-center">
            Welcome to Crystal Arcade
          </h1>
          <p className="text-xl mb-8 max-w-2xl text-center">
            Experience the future of shopping with our AI-powered mall management system
          </p>
          <motion.button
            className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-3 rounded-full text-lg font-semibold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore Now
          </motion.button>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-teal-900 mb-16">
            Why Choose Crystal Arcade
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
              >
                <div className="text-teal-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-teal-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-teal-900 mb-16">
            Explore Our Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Food", image: MallImg },
              { title: "Entertainment", image: MallImgss },
              { title: "Fashion", image: MallImagess },
              { title: "Lifestyle", image: MallImages }
            ].map((category, index) => (
              <motion.div
                key={index}
                className="relative rounded-xl overflow-hidden shadow-lg group"
                whileHover={{ scale: 1.03 }}
              >
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent group-hover:from-black/80 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {category.title}
                  </h3>
                  <button className="text-white bg-teal-600 px-4 py-2 rounded-full text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    View More
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Rest of your sections... */}
    </div>
  );
};

export default HomePage;
