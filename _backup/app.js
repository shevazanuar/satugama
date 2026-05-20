document.addEventListener('DOMContentLoaded', () => {
  // --- Navigation & Scroll Effects ---
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section');
  
  // Scrolled Header Background
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    // Highlight Active Link on Scroll
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navLinksList = document.getElementById('nav-links');
  
  menuToggle.addEventListener('click', () => {
    navLinksList.classList.toggle('active');
    // Rotate toggle lines (hamburger animation)
    const spans = menuToggle.querySelectorAll('span');
    spans[0].style.transform = navLinksList.classList.contains('active') ? 'rotate(45deg) translate(6px, 6px)' : 'none';
    spans[1].style.opacity = navLinksList.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navLinksList.classList.contains('active') ? 'rotate(-45deg) translate(5px, -5px)' : 'none';
  });

  // Close Mobile Menu on Link Click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksList.classList.remove('active');
      const spans = menuToggle.querySelectorAll('span');
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    });
  });

  // --- Character Customizer Logic ---
  
  // Element References
  const charSvg = document.getElementById('char-svg');
  const hairStyle = document.getElementById('hair-style');
  const charSkin = document.getElementById('char-skin');
  const armorChest = document.getElementById('armor-chest');
  const armorShoulderL = document.getElementById('armor-shoulder-l');
  const armorShoulderR = document.getElementById('armor-shoulder-r');
  const shieldColor = document.getElementById('shield-color');
  
  // Weapons SVG groups
  const weaponSword = document.getElementById('weapon-sword');
  const weaponBow = document.getElementById('weapon-bow');
  const weaponStaff = document.getElementById('weapon-staff');
  
  // Accessories SVG groups
  const accessoryShield = document.getElementById('accessory-shield');
  
  // Style Definitions (SVG Paths and Colors)
  const hairStyles = {
    warrior: 'M39,26 L42,16 L45,26 L48,15 L52,26 L55,16 L58,26 L61,20 L58,28 H40 Z', // spiky warrior hair
    mage: 'M34,26 L50,4 L66,26 L58,28 Q50,29 42,28 Z', // wizard hat shape
    ranger: 'M38,26 C36,12 64,12 62,26 L64,40 L60,40 L58,30 H42 L40,40 L36,40 Z', // hood/long ranger hair
    cyber: 'M36,25 H64 V33 H36 Z' // cyber helmet/visor
  };
  
  const armorStyles = {
    iron: { chest: '#708090', shoulders: '#506070' },
    gold: { chest: '#ffd700', shoulders: '#c5a000' },
    cloth: { chest: '#4a3f75', shoulders: '#322956' },
    obsidian: { chest: '#1e1435', shoulders: '#110a21' }
  };

  const skins = {
    warrior: '#ffdbac', // Tan human
    mage: '#ffd1a9', // Light human
    ranger: '#e0ac69', // Olive human
    cyber: '#4ef2d2' // Neon cyan Android skin
  };

  // State Management
  let currentClass = 'warrior';
  let currentWeapon = 'sword';
  let currentAcc = 'shield';
  let currentPrimaryColor = '#ffd700'; // Default gold
  let currentArmorMaterial = 'iron';

  // Apply Changes to SVG
  function updateCharacter() {
    // 1. Class / Hair / Skin
    hairStyle.setAttribute('d', hairStyles[currentClass]);
    charSkin.setAttribute('fill', skins[currentClass]);
    
    // Set Hair color
    if (currentClass === 'cyber') {
      hairStyle.setAttribute('fill', '#00f0ff'); // Neon cyber visor always cyan
      hairStyle.setAttribute('stroke', '#ff007a');
      hairStyle.setAttribute('stroke-width', '1');
    } else {
      hairStyle.setAttribute('fill', currentPrimaryColor);
      hairStyle.removeAttribute('stroke');
      hairStyle.removeAttribute('stroke-width');
    }

    // 2. Weapon toggle
    weaponSword.style.display = currentWeapon === 'sword' ? 'block' : 'none';
    weaponStaff.style.display = currentWeapon === 'staff' ? 'block' : 'none';
    weaponBow.style.display = currentWeapon === 'bow' ? 'block' : 'none';

    // 3. Accessory toggle
    accessoryShield.style.display = (currentAcc === 'shield' || currentAcc === 'both') ? 'block' : 'none';
    
    // 4. Armor colors
    let chestColor = armorStyles[currentArmorMaterial].chest;
    let shoulderColor = armorStyles[currentArmorMaterial].shoulders;
    
    // If cloth, tint with primary color selection for premium feel!
    if (currentArmorMaterial === 'cloth') {
      chestColor = currentPrimaryColor;
      shoulderColor = adjustColorBrightness(currentPrimaryColor, -20);
    }
    
    armorChest.setAttribute('fill', chestColor);
    armorShoulderL.setAttribute('fill', shoulderColor);
    armorShoulderR.setAttribute('fill', shoulderColor);
    
    // Shield color adjustment
    if (shieldColor) {
      shieldColor.setAttribute('fill', currentPrimaryColor);
    }
  }

  // Helper to adjust color brightness
  function adjustColorBrightness(hex, percent) {
    let R = parseInt(hex.substring(1, 3), 16);
    let G = parseInt(hex.substring(3, 5), 16);
    let B = parseInt(hex.substring(5, 7), 16);

    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = (R > 0) ? R : 0;
    G = (G > 0) ? G : 0;
    B = (B > 0) ? B : 0;

    const rHex = R.toString(16).padStart(2, '0');
    const gHex = G.toString(16).padStart(2, '0');
    const bHex = B.toString(16).padStart(2, '0');

    return `#${rHex}${gHex}${bHex}`;
  }

  // Option Click Handlers
  const optionButtons = document.querySelectorAll('.option-btn');
  optionButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const type = e.target.getAttribute('data-type');
      const val = e.target.getAttribute('data-value');
      
      // Update UI active state
      const siblingButtons = e.target.parentElement.querySelectorAll('.option-btn');
      siblingButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      // Update State
      if (type === 'class') currentClass = val;
      if (type === 'weapon') currentWeapon = val;
      if (type === 'acc') currentAcc = val;
      if (type === 'armor') currentArmorMaterial = val;
      
      updateCharacter();
    });
  });

  // Color Dot Handlers
  const colorDots = document.querySelectorAll('.color-dot');
  colorDots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      colorDots.forEach(d => d.classList.remove('active'));
      e.target.classList.add('active');
      currentPrimaryColor = e.target.getAttribute('data-color');
      
      updateCharacter();
    });
  });

  // Randomize Button
  document.getElementById('btn-randomize').addEventListener('click', () => {
    const classes = ['warrior', 'mage', 'ranger', 'cyber'];
    const weapons = ['sword', 'staff', 'bow', 'none'];
    const accs = ['shield', 'cape', 'both', 'none'];
    const armors = ['iron', 'gold', 'cloth', 'obsidian'];
    
    currentClass = classes[Math.floor(Math.random() * classes.length)];
    currentWeapon = weapons[Math.floor(Math.random() * weapons.length)];
    currentAcc = accs[Math.floor(Math.random() * accs.length)];
    currentArmorMaterial = armors[Math.floor(Math.random() * armors.length)];
    
    // Choose random color dot
    const randomDotIdx = Math.floor(Math.random() * colorDots.length);
    colorDots.forEach(d => d.classList.remove('active'));
    colorDots[randomDotIdx].classList.add('active');
    currentPrimaryColor = colorDots[randomDotIdx].getAttribute('data-color');

    // Sync button active states in UI
    syncUIState('class', currentClass);
    syncUIState('weapon', currentWeapon);
    syncUIState('acc', currentAcc);
    syncUIState('armor', currentArmorMaterial);

    updateCharacter();
  });

  function syncUIState(type, value) {
    const btns = document.querySelectorAll(`.option-btn[data-type="${type}"]`);
    btns.forEach(btn => {
      if (btn.getAttribute('data-value') === value) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Download SVG
  document.getElementById('btn-download-svg').addEventListener('click', () => {
    // Get SVG source
    const svgData = new XMLSerializer().serializeToString(charSvg);
    const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    
    // Trigger download link
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = `satugama_${currentClass}_${currentWeapon}.svg`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  });

  // --- Portfolio / Project Gallery Filtering ---
  const filterButtons = document.querySelectorAll('.filter-btn');
  const galleryCards = document.querySelectorAll('.gallery-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      // Toggle active filter button
      filterButtons.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const filterValue = e.target.getAttribute('data-filter');
      
      galleryCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          // Simple transition
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.4s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- Contact Form Submission ---
  const quoteForm = document.getElementById('quote-form');
  const formStatus = document.getElementById('form-status');

  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Collect data values
    const name = document.getElementById('form-name').value;
    const email = document.getElementById('form-email').value;
    const style = document.getElementById('form-style').value;
    const budget = document.getElementById('form-budget').value;
    const message = document.getElementById('form-message').value;

    // Simulate submission loading
    formStatus.style.display = 'block';
    formStatus.className = 'form-message';
    formStatus.textContent = 'Mengirim request penawaran...';
    formStatus.style.color = 'var(--text-muted)';
    
    setTimeout(() => {
      formStatus.className = 'form-message success';
      formStatus.textContent = `Terima kasih ${name}! Request penawaran Anda mengenai gaya "${style}" telah terkirim. Kami akan menghubungi Anda di ${email}.`;
      quoteForm.reset();
    }, 1500);
  });

  // Run initial state render
  updateCharacter();
});
