import { useState } from 'react';

const FloatingMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false); // Close floating menu when modal opens
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleModalOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      phone: formData.get('phone'),
      message: formData.get('message')
    };
    
    // Handle form submission here
    console.log('Form submitted:', data);
    
    // For now, just close the modal
    closeModal();
    
    // Reset form
    e.target.reset();
  };

  return (
    <>
      {/* Multi-Action Floating Menu */}
      <div className="floating-menu">
        {/* Main Toggle Button */}
        <button 
          className={`floating-menu-toggle ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
          aria-label="Open floating menu"
        >
          <i className="fas fa-plus"></i>
        </button>
        
        {/* Action Buttons */}
        <div className={`floating-menu-items ${isMenuOpen ? 'active' : ''}`}>
          {/* Call Button */}
          <a 
            href="tel:+919115866828" 
            className="floating-menu-item call-btn" 
            data-tooltip="Call us"
          >
            <i className="fas fa-phone"></i>
          </a>
          
          {/* WhatsApp Button */}
          <a 
            href="https://wa.me/919115866828" 
            target="_blank" 
            rel="noopener noreferrer"
            className="floating-menu-item whatsapp-btn" 
            data-tooltip="WhatsApp us"
          >
            <i className="fab fa-whatsapp"></i>
          </a>
          
          {/* Query Button */}
          <button 
            className="floating-menu-item query-btn" 
            data-tooltip="Send Query"
            onClick={openModal}
          >
            <i className="fas fa-envelope"></i>
          </button>
        </div>
      </div>

      {/* Query Modal */}
      <div 
        className={`query-modal ${isModalOpen ? 'active' : ''}`}
        onClick={handleModalOverlayClick}
      >
        <div className="modal-content">
          <div className="modal-header">
            <h3>Send us a Query</h3>
            <button className="modal-close" onClick={closeModal}>
              &times;
            </button>
          </div>
          <div className="modal-body">
            <form className="query-form" onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="queryName">Name</label>
                <input type="text" id="queryName" name="name" required />
              </div>
              <div className="form-group">
                <label htmlFor="queryPhone">Phone</label>
                <input type="tel" id="queryPhone" name="phone" required />
              </div>
              <div className="form-group">
                <label htmlFor="queryMessage">Message</label>
                <textarea id="queryMessage" name="message" rows="4" required></textarea>
              </div>
              <button type="submit" className="submit-btn">Submit Query</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingMenu;
