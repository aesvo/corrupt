const filterBlocks = document.querySelectorAll('.filter-block');
    let currentValue = 'all';
    filterBlocks.forEach(block => {
      block.addEventListener('click', () => selectBlock(block));
      block.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectBlock(block);
        }
      });
    });
    function selectBlock(block) {
      filterBlocks.forEach(b => b.classList.remove('active'));
      block.classList.add('active');
      currentValue = block.getAttribute('data-value');
      filterUpdates(currentValue);
    }
    function filterUpdates(value) {
      document.querySelectorAll('.update-card').forEach(update => {
        update.style.display = (value === 'all' || update.classList.contains(value)) ? 'block' : 'none';
      });
    }
    function showPage(pageId, link) {
      document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
      document.getElementById(pageId).classList.add('active');
      document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
      if(link) link.classList.add('active');
      if(window.innerWidth <= 600) toggleMenu(false);
    }
    function toggleMenu(force) {
      const navItems = document.getElementById('navItems');
      if(typeof force === 'boolean') {
        navItems.classList.toggle('show', force);
      } else {
        navItems.classList.toggle('show');
      }
    }
    document.addEventListener('DOMContentLoaded', () => {
      document.querySelectorAll('.update-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.style.animation = 'fadeInUp 0.6s cubic-bezier(0.4, 0, 0.2, 1) forwards';
      });
      document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', function(e) {
          if (e.target.tagName.toLowerCase() === 'a') return;
          const item = this.parentElement;
          const answer = item.querySelector('.faq-answer');
          const expanded = this.getAttribute('aria-expanded') === 'true';
          document.querySelectorAll('.faq-item').forEach(i => {
            if(i !== item) {
              i.classList.remove('open');
              i.querySelector('.faq-answer').style.display = 'none';
              i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
            }
          });
          item.classList.toggle('open');
          if(expanded) {
            answer.style.display = 'none';
            this.setAttribute('aria-expanded', 'false');
          } else {
            answer.style.display = 'block';
            this.setAttribute('aria-expanded', 'true');
          }
        });
      });

      // Hamburger menu toggle
      const hamburger = document.getElementById('hamburgerBtn');
      const navItems = document.getElementById('navItems');
      if (hamburger && navItems) {
        hamburger.addEventListener('click', () => {
          navItems.classList.toggle('show');
        });
      }
    });