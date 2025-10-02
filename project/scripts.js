
/* scripts.js - final project with Leaflet map and full functionality */
document.addEventListener('DOMContentLoaded', ()=>{
  // Mobile menu
  const hamburger = document.querySelector('.hamburger');
  if(hamburger) hamburger.addEventListener('click', ()=> document.querySelector('.nav').classList.toggle('visible'));

  // Dataset: 10 museums with lat/lng in Montevideo
  const museums = [
    {id:1,name:'National Museum of Visual Arts',category:'Art',zone:'Centro',open:10,close:18,lat:-34.9115,lng:-56.1645,desc:'Houses an extensive collection of Uruguayan visual arts.',img:'images/1.jpg'},
    {id:2,name:'Carnival Museum',category:'Culture',zone:'Ciudad Vieja',open:9,close:17,lat:-34.9071,lng:-56.2116,desc:"Celebrates Montevideo's vibrant carnival traditions.",img:'images/2.webp'},
    {id:3,name:'National History Museum',category:'History',zone:'Ciudad Vieja',open:10,close:16,lat:-34.9085,lng:-56.2011,desc:'Exhibits documents and artifacts of national history.',img:'images/3.webp'},
    {id:4,name:'Science Center',category:'Science',zone:'Parque Rodó',open:11,close:19,lat:-34.9169,lng:-56.1653,desc:'Interactive science exhibits suitable for all ages.',img:'images/4.webp'},
    {id:5,name:'Maritime Museum',category:'Maritime',zone:'Ciudad Vieja',open:10,close:17,lat:-34.9035,lng:-56.2090,desc:'Maritime artifacts and port history.',img:'images/5.jpg'},
    {id:6,name:'Modern Art Gallery',category:'Art',zone:'Centro',open:10,close:18,lat:-34.9070,lng:-56.1860,desc:'Contemporary exhibitions of international and local artists.',img:'images/6.jpg'},
    {id:7,name:'Ethnography Museum',category:'Culture',zone:'Centro',open:9,close:16,lat:-34.9060,lng:-56.1950,desc:'Cultural heritage and ethnographic collections.',img:'images/7.jpg'},
    {id:8,name:"Children's Museum",category:'Family',zone:'Parque Rodó',open:10,close:17,lat:-34.9178,lng:-56.1619,desc:'Hands-on exhibits for children and families.',img:'images/8.jpg'},
    {id:9,name:'Photography Museum',category:'Photography',zone:'Pocitos',open:11,close:18,lat:-34.9155,lng:-56.1503,desc:'Photographic archives and rotating exhibitions.',img:'images/9.webp'},
    {id:10,name:'Textile & Design Museum',category:'Design',zone:'Carrasco',open:10,close:16,lat:-34.8920,lng:-56.0680,desc:'Textile history and contemporary design displays.',img:'images/10.jpg'}
  ];

  // Helper: render card list
  function renderCards(list, containerSelector){
    const container = document.querySelector(containerSelector);
    if(!container) return;
    container.innerHTML = '';
    list.forEach(m => {
      const card = document.createElement('article');
      card.className = 'card';
      card.innerHTML = `
        <img src="${m.img}" alt="${m.name}" loading="lazy">
        <div class="card-body">
          <span class="tag">${m.category}</span>
          <h4>${m.name}</h4>
          <p>${m.zone} • ${m.open}:00 - ${m.close}:00</p>
          <p><button class="btn ghost" data-id="${m.id}">View details</button></p>
        </div>
      `;
      container.appendChild(card);
    });
  }

  // Initial render: home featured (first 4) and all
  renderCards(museums.slice(0,4), '#featured-cards');
  renderCards(museums, '#all-cards');

  // Open Now
  const openNowContainer = document.querySelector('#open-now');
  if(openNowContainer){
    const hour = new Date().getHours();
    const openList = museums.filter(m => hour >= m.open && hour < m.close);
    openNowContainer.innerHTML = openList.length ? openList.map(m=>`<div><strong>${m.name}</strong> — Open until ${m.close}:00</div>`).join('') : '<p>No museums are open right now.</p>';
  }

  // Modal (create once)
  function createModal(){
    if(document.querySelector('#museum-modal')) return;
    const modal = document.createElement('div');
    modal.id = 'museum-modal';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-hidden','true');
    modal.innerHTML = `
      <div class="modal-backdrop" id="modal-backdrop"></div>
      <div class="modal-panel" role="document" aria-labelledby="modal-title">
        <button class="modal-close" aria-label="Close details">&times;</button>
        <div class="modal-content">
          <img id="modal-img" src="images/placeholder-1.svg" alt="">
          <div>
            <h2 id="modal-title">Title</h2>
            <p id="modal-category"></p>
            <p id="modal-zone"></p>
            <p id="modal-hours"></p>
            <p id="modal-desc"></p>
          </div>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
    // close handlers
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('#modal-backdrop').addEventListener('click', closeModal);
  }

  function openModal(museum){
    createModal();
    const modal = document.querySelector('#museum-modal');
    modal.setAttribute('aria-hidden','false');
    modal.classList.add('show');
    modal.querySelector('#modal-img').src = museum.img || 'images/placeholder-1.svg';
    modal.querySelector('#modal-title').textContent = museum.name;
    modal.querySelector('#modal-category').textContent = 'Category: ' + museum.category;
    modal.querySelector('#modal-zone').textContent = 'Zone: ' + museum.zone;
    modal.querySelector('#modal-hours').textContent = `Hours: ${museum.open}:00 - ${museum.close}:00`;
    modal.querySelector('#modal-desc').textContent = museum.desc || '';
  }
  function closeModal(){
    const modal = document.querySelector('#museum-modal');
    if(!modal) return;
    modal.setAttribute('aria-hidden','true');
    modal.classList.remove('show');
  }

  // Delegated click for View details buttons
  document.body.addEventListener('click', (e)=>{
    const btn = e.target.closest('button[data-id]');
    if(btn){
      const id = Number(btn.dataset.id);
      const museum = museums.find(m => m.id === id);
      if(museum) openModal(museum);
    }
  });

  // Contact form saving to localStorage
  const contactForm = document.querySelector('#contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', (e)=>{
      e.preventDefault();
      const name = contactForm.querySelector('#name').value.trim();
      const email = contactForm.querySelector('#email').value.trim();
      const message = contactForm.querySelector('#message').value.trim();
      if(!name || !email || !message){ alert('Please complete all fields before submitting.'); return; }
      const submissions = JSON.parse(localStorage.getItem('museumContactSubmissions')||'[]');
      submissions.push({id:Date.now(), name, email, message});
      localStorage.setItem('museumContactSubmissions', JSON.stringify(submissions));
      contactForm.reset();
      alert('Thanks! Your message was saved locally.');
      const adminList = document.querySelector('#saved-submissions');
      if(adminList) renderSubmissions(adminList);
    });
  }
  function renderSubmissions(container){
    const submissions = JSON.parse(localStorage.getItem('museumContactSubmissions')||'[]');
    container.innerHTML = '';
    submissions.slice().reverse().forEach(s=>{
      const row = document.createElement('div');
      row.style.borderBottom = '1px solid #e6e6e6';
      row.style.padding = '8px 0';
      row.innerHTML = `<strong>${s.name}</strong> — ${s.email}<div style="font-size:0.9rem;color:#555">${s.message}</div>`;
      container.appendChild(row);
    });
  }
  const adminList = document.querySelector('#saved-submissions');
  if(adminList) renderSubmissions(adminList);

  // LEAFLET MAP (zones page)
  const mapEl = document.querySelector('#map');
  let map, markers = [];
  if(mapEl && typeof L !== 'undefined'){
    map = L.map('map').setView([-34.9011, -56.1645], 12);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);

    function addMarkers(list){
      // clear existing
      markers.forEach(m=>map.removeLayer(m));
      markers = [];
      list.forEach(m => {
        const marker = L.marker([m.lat, m.lng]).addTo(map);
        marker.on('click', ()=> openModal(m));
        markers.push(marker);
      });
    }

    // initial markers = all
    addMarkers(museums);

    // zone filter buttons: update list and markers
    document.querySelectorAll('[data-zone]').forEach(btn => {
      btn.addEventListener('click', ()=>{
        const zone = btn.dataset.zone;
        const list = zone === 'all' ? museums : museums.filter(x => x.zone === zone);
        renderCards(list, '#all-cards');
        addMarkers(list);
        if(list.length) map.setView([list[0].lat, list[0].lng], 12);
      });
    });
  }

  // Footer update (English only)
  document.querySelectorAll('footer').forEach(f => f.innerHTML = `<p>© 2025 Museums of Montevideo</p><p>Last updated: September 24, 2025</p>`);

});
