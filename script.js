// script.js - COMPLETE WORKING VERSION
document.addEventListener('DOMContentLoaded', function() {
  console.log('🚀 MyProtection App initializing...');
  
  // Wait for DOM to be fully loaded
  setTimeout(initializeApp, 100);
  
  function initializeApp() {
    // Get all required elements
    const elements = {
      startBtn: document.getElementById('startBtn'),
      formSection: document.getElementById('formSection'),
      calcBtn: document.getElementById('calcBtn'),
      resultSection: document.getElementById('resultSection'),
      resultBox: document.getElementById('resultBox'),
      sendBtn: document.getElementById('sendBtn'),
      bookBtn: document.getElementById('bookBtn'),
      emailSection: document.getElementById('emailSection'),
      emailForm: document.getElementById('emailForm'),
      protectionForm: document.getElementById('protectionForm'),
      cancelEmailBtn: document.getElementById('cancelEmailBtn')
    };

    // Check if all critical elements exist
    let allElementsFound = true;
    const criticalElements = ['startBtn', 'formSection', 'protectionForm'];
    
    criticalElements.forEach(id => {
      if (!elements[id]) {
        console.error(`❌ Critical element not found: ${id}`);
        allElementsFound = false;
      } else {
        console.log(`✅ Found: ${id}`);
      }
    });

    if (!allElementsFound) {
      console.error('❌ MyProtection: Critical elements missing. Check HTML structure.');
      return;
    }

    // Hide all sections initially except hero
    function hideAllSections() {
      const sections = ['formSection', 'resultSection', 'emailSection'];
      sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
          section.style.display = 'none';
        }
      });
    }

    // Show specific section
    function showSection(sectionId) {
      console.log(`📍 Showing section: ${sectionId}`);
      hideAllSections();
      
      const section = document.getElementById(sectionId);
      if (section) {
        section.style.display = 'block';
        console.log(`✅ Section ${sectionId} is now visible`);
      } else {
        console.error(`❌ Section ${sectionId} not found`);
      }
    }

    // Scroll to section
    function scrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        console.log(`📍 Scrolled to: ${sectionId}`);
      } else {
        console.error(`❌ Cannot scroll - section ${sectionId} not found`);
      }
    }

    // Initialize sections
    hideAllSections();
    
    // Format currency
    function formatCurrency(amount) {
      if (isNaN(amount) || amount === null) return '$0';
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
      }).format(amount);
    }

    // Calculate exposure
    function calculateExposure(formData) {
      console.log('🔢 Calculating exposure...');
      
      const homeValue = parseFloat(formData.homeValue) || 0;
      const vehicleValue = parseFloat(formData.vehicleValue) || 0;
      const savingsValue = parseFloat(formData.savingsValue) || 0;
      const incomeValue = parseFloat(formData.incomeValue) || 0;
      
      const totalExposure = homeValue + vehicleValue + savingsValue + incomeValue;
      
      console.log('💰 Exposure breakdown:', {
        homeValue: formatCurrency(homeValue),
        vehicleValue: formatCurrency(vehicleValue),
        savingsValue: formatCurrency(savingsValue),
        incomeValue: formatCurrency(incomeValue),
        totalExposure: formatCurrency(totalExposure)
      });
      
      return totalExposure;
    }

    // Get recommendation
    function getRecommendation(exposure) {
      console.log(`📊 Getting recommendation for exposure: ${formatCurrency(exposure)}`);
      
      let recommendation;
      
      if (exposure <= 60000) {
        recommendation = {
          coverage: '30/60',
          gap: 'insufficient',
          message: 'You may need higher coverage to protect your assets'
        };
      } else if (exposure <= 100000) {
        recommendation = {
          coverage: '50/100',
          gap: 'insufficient',
          message: 'Consider increasing your liability coverage'
        };
      } else if (exposure <= 300000) {
        recommendation = {
          coverage: '100/300',
          gap: 'adequate',
          message: 'Your current coverage may be adequate'
        };
      } else if (exposure <= 500000) {
        recommendation = {
          coverage: '500/500',
          gap: 'adequate',
          message: 'Higher limits recommended for better protection'
        };
      } else {
        recommendation = {
          coverage: '500/500 + $1M Umbrella',
          gap: 'excellent',
          message: 'Excellent coverage for high-value assets'
        };
      }
      
      console.log('✅ Recommendation:', recommendation);
      return recommendation;
    }

    // Professional Insurance Agent Analysis
    function createProfessionalAnalysis(exposure, recommended, assetInfo) {
      const { homeValue, vehicleValue, savingsValue, incomeValue } = assetInfo;
      const totalAssets = homeValue + vehicleValue + savingsValue;
      
      let analysisMessage;
      
      if (exposure <= 60000) {
        analysisMessage = `I can see you're building something special here. With your ${formatCurrency(homeValue)} home and ${formatCurrency(vehicleValue)} in vehicles, plus ${formatCurrency(savingsValue)} you've saved, you need ${recommended.coverage} coverage to keep it all protected. This level of liability insurance makes sure an unexpected accident doesn't put your home or hard-earned savings at risk.`;
      } else if (exposure <= 100000) {
        analysisMessage = `You've built a great life with ${formatCurrency(homeValue)} in your home and ${formatCurrency(vehicleValue)} worth of vehicles. With ${formatCurrency(savingsValue)} in the bank and your ${formatCurrency(incomeValue)} income, I recommend ${recommended.coverage} to protect everything you've earned. This coverage keeps your assets safe while still being affordable.`;
      } else if (exposure <= 300000) {
        analysisMessage = `You've really accomplished something - ${formatCurrency(homeValue)} home, ${formatCurrency(vehicleValue)} in vehicles, and ${formatCurrency(savingsValue)} saved up! With your ${formatCurrency(incomeValue)} income, you need ${recommended.coverage} liability protection to keep all these assets secure. This coverage level ensures your family's financial future stays protected.`;
      } else if (exposure <= 500000) {
        analysisMessage = `Wow, you've built substantial wealth here - ${formatCurrency(homeValue)} home, ${formatCurrency(vehicleValue)} in vehicles, and ${formatCurrency(savingsValue)} investments. Your ${formatCurrency(incomeValue)} income means you're still growing. I recommend ${recommended.coverage} to properly protect all your assets. This keeps your family secure while you continue building wealth.`;
      } else {
        analysisMessage = `You've achieved true financial success - ${formatCurrency(homeValue)} home, ${formatCurrency(vehicleValue)} in vehicles, and ${formatCurrency(savingsValue)} in investments. With your ${formatCurrency(incomeValue)} income, you need ${recommended.coverage} plus an umbrella policy. This comprehensive protection ensures your wealth never gets touched by unexpected liabilities.`;
      }
      
      console.log('💼 Professional analysis created');
      return analysisMessage;
    }

    // Display results with professional analysis
    function displayResults(exposure, recommendation) {
      console.log('📋 Displaying results...');
      
      const exposureAmount = document.getElementById('exposureAmount');
      const gapElement = document.getElementById('gapAnalysis');
      
      if (exposureAmount) {
        exposureAmount.textContent = formatCurrency(exposure);
        console.log('✅ Exposure amount updated');
      } else {
        console.error('❌ exposureAmount element not found');
      }
      
      if (gapElement) {
        // Get form data for professional analysis
        const formData = new FormData(elements.protectionForm);
        const assetInfo = {
          homeValue: parseFloat(formData.get('homeValue')) || 0,
          vehicleValue: parseFloat(formData.get('vehicleValue')) || 0,
          savingsValue: parseFloat(formData.get('savingsValue')) || 0,
          incomeValue: parseFloat(formData.get('incomeValue')) || 0
        };
        
        const professionalAnalysis = createProfessionalAnalysis(exposure, recommendation, assetInfo);
        gapElement.textContent = professionalAnalysis;
        gapElement.className = `gap ${recommendation.gap}`;
        console.log('✅ Professional analysis updated');
      } else {
        console.error('❌ gapAnalysis element not found');
      }
    }

    // Validate form
    function validateForm() {
      console.log('🔍 Validating form...');
      
      if (!elements.protectionForm) {
        console.error('❌ Protection form not found');
        return false;
      }
      
      const requiredFields = elements.protectionForm.querySelectorAll('[required]');
      let isValid = true;
      let emptyFields = [];
      
      requiredFields.forEach(field => {
        if (!field.value || field.value.trim() === '') {
          field.style.borderColor = '#ff4444';
          field.style.borderWidth = '2px';
          field.focus();
          emptyFields.push(field.id || field.name);
          isValid = false;
        } else {
          field.style.borderColor = 'var(--border)';
          field.style.borderWidth = '2px';
        }
      });
      
      // Check if form has sufficient data
      const homeValue = parseFloat(elements.protectionForm.querySelector('#homeValue')?.value) || 0;
      const vehicleValue = parseFloat(elements.protectionForm.querySelector('#vehicleValue')?.value) || 0;
      const savingsValue = parseFloat(elements.protectionForm.querySelector('#savingsValue')?.value) || 0;
      const incomeValue = parseFloat(elements.protectionForm.querySelector('#incomeValue')?.value) || 0;
      
      if (homeValue === 0 && vehicleValue === 0 && savingsValue === 0 && incomeValue === 0) {
        alert('Please enter at least some values for your assets or income to get an accurate protection analysis.');
        isValid = false;
      }
      
      if (!isValid) {
        console.log('❌ Invalid fields:', emptyFields);
        alert(`Please fill in all required fields:\n${emptyFields.join(', ')}`);
      } else {
        console.log('✅ Form validation passed');
      }
      
      return isValid;
    }

    // EVENT LISTENERS
    console.log('🎯 Setting up event listeners...');
    
    // Start button
    elements.startBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('🚀 Start button clicked');
      showSection('formSection');
      scrollToSection('formSection');
    });
    console.log('✅ Start button listener added');
    
    // Protection form submit
    elements.protectionForm.addEventListener('submit', function(e) {
      e.preventDefault();
      console.log('📝 Protection form submitted');
      
      if (!validateForm()) {
        return;
      }
      
      const formData = new FormData(elements.protectionForm);
      const data = Object.fromEntries(formData);
      console.log('📊 Form data:', data);
      
      try {
        // Calculate exposure
        const exposure = calculateExposure(data);
        
        // Get recommendation
        const recommendation = getRecommendation(exposure);
        
        // Create asset info for professional analysis
        const assetInfo = {
          homeValue: parseFloat(data.homeValue) || 0,
          vehicleValue: parseFloat(data.vehicleValue) || 0,
          savingsValue: parseFloat(data.savingsValue) || 0,
          incomeValue: parseFloat(data.incomeValue) || 0
        };
        
        // Create professional analysis
        const professionalAnalysis = createProfessionalAnalysis(exposure, recommendation, assetInfo);
        
        // Display results
        displayResults(exposure, recommendation);
        
        // Show result section
        showSection('resultSection');
        scrollToSection('resultSection');
        
        // Store data for email
        window.myProtectionData = {
          ...data,
          exposure,
          recommendation: recommendation.coverage,
          professionalAnalysis,
          message: recommendation.message
        };
        
        console.log('✅ All data processed successfully');
        console.log('💾 Data stored for email functionality');
        
      } catch (error) {
        console.error('❌ Error processing form:', error);
        alert('There was an error calculating your results. Please try again.');
      }
    });
    console.log('✅ Protection form listener added');
    
    // Send results button
    if (elements.sendBtn) {
      elements.sendBtn.addEventListener('click', function() {
        console.log('📧 Send button clicked');
        
        if (!window.myProtectionData) {
          alert('Please calculate your MyProtection Number first.');
          return;
        }
        
        showSection('emailSection');
        scrollToSection('emailSection');
      });
      console.log('✅ Send button listener added');
    } else {
      console.log('⚠️ Send button not found');
    }
    
    // Email form submit
    if (elements.emailForm) {
      elements.emailForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('📧 Email form submitted');
        
        if (!window.myProtectionData) {
          alert('Please calculate your MyProtection Number first.');
          return;
        }
        
        const emailData = new FormData(elements.emailForm);
        const userInfo = Object.fromEntries(emailData);
        console.log('📧 Email data:', userInfo);
        
        const data = window.myProtectionData;
        
        // Create email content with professional analysis
        const subject = `MyProtection Number Results - ${userInfo.userName}`;
        const body = `MyProtection Number Results

Name: ${userInfo.userName}
Email: ${userInfo.userEmail}

YOUR FINANCIAL PROFILE:
- Home Value: ${formatCurrency(data.homeValue)}
- Vehicle Value: ${formatCurrency(data.vehicleValue)}  
- Savings & Investments: ${formatCurrency(data.savingsValue)}
- Annual Household Income: ${formatCurrency(data.incomeValue)}
- Life Insurance: ${formatCurrency(data.lifeInsurance)}

MY PROTECTION ANALYSIS:
- Total Protection Exposure: ${formatCurrency(data.exposure)}
- Recommended Coverage: ${data.recommendation}
- Professional Assessment: ${data.professionalAnalysis}

Next Steps: ${data.message}

This analysis was generated by the MyProtection educational tool.
This is not a quote, offer, or guarantee of coverage.

Best regards,
${userInfo.userName}`;
        
        // Create mailto link
        const mailtoLink = `mailto:Tre.Scott@countryfinancial.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        console.log('📧 Email link created');
        
        // Open email client
        window.location.href = mailtoLink;
        
        // Reset and show success message
        setTimeout(() => {
          alert('Your email client should now open with your results pre-filled. If it doesn\'t open automatically, please email them to Tre.Scott@countryfinancial.com');
          elements.protectionForm.reset();
          elements.emailForm.reset();
          showSection('formSection');
          scrollToSection('formSection');
        }, 1000);
      });
      console.log('✅ Email form listener added');
    } else {
      console.log('⚠️ Email form not found');
    }
    
    // Cancel email button
    if (elements.cancelEmailBtn) {
      elements.cancelEmailBtn.addEventListener('click', function() {
        console.log('❌ Cancel email button clicked');
        showSection('resultSection');
        scrollToSection('resultSection');
        elements.emailForm.reset();
      });
      console.log('✅ Cancel email button listener added');
    }
    
    // Book appointment
    if (elements.bookBtn) {
      elements.bookBtn.addEventListener('click', function() {
        console.log('📅 Book appointment clicked');
        window.open('https://outlook.office365.com/book/TreScottAgencyCOUNTRYFinancial@countryfinancial.com/?RefID=rep_bio&ismsaljsauthenabled=true', '_blank');
      });
      console.log('✅ Book appointment listener added');
    } else {
      console.log('⚠️ Book appointment button not found');
    }
    
    console.log('🎉 MyProtection App fully initialized and ready!');
    console.log('📱 All event listeners are active');
  }
});

// Fallback initialization
window.addEventListener('load', function() {
  if (document.readyState === 'complete') {
    console.log('📱 Page loaded, MyProtection app ready');
  }
});