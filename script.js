// Calendar events
const projects = [
  { title: "Brand Launch", date: "2022-07-01", link: "bio.html", type: "branding" },
  { title: "Blue Rockies Silver Studio", date: "2024-09-20", link: "bluerockiessilverstudio.html", type: "branding" },
  { title: "Instinct 9 Energy Drink", date: "2024-12-21", link: "instinct9.html", type: "branding" },
  { title: "Guardians of Africa", date: "2025-01-12", link: "guardiansofafrica.html", type: "publications" },
  { title: "P!NK Summer Carnival Poster", date: "2025-02-02", link: "p!nkposter.html", type: "illustrations" },
  { title: "Made With Love & Butter", date: "2025-03-25", link: "madewithloveandbutter.html", type: "branding" },
  { title: "Zoe's Animal Rescue", date: "2025-05-13", link: "zoesanimalrescue.html", type: "advertising" },
    { title: "Oolong Tea", date: "2025-01-12", link: "oolongtea.html", type: "illustrations" },
       { title: "Wednesday Poster", date: "2024-12-24", link: "wednesday.html", type: "illustrations" },

];

// Toggle Start Menu
const startBtn = document.getElementById('startBtn');
const startMenu = document.getElementById('startMenu');

if (startBtn && startMenu) {
  startBtn.addEventListener('click', () => {
    startMenu.style.display = startMenu.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!startBtn.contains(e.target) && !startMenu.contains(e.target)) {
      startMenu.style.display = 'none';
    }
  });
}

// Live Clock + Date
function updateClock() {
  const now = new Date();
  const hours = now.getHours().toString().padStart(2, '0');
  const mins = now.getMinutes().toString().padStart(2, '0');
  const day = now.toLocaleDateString('en-US', { month: 'short', day: '2-digit' });

  const timeElem = document.getElementById('taskbarTime');
  const dateElem = document.getElementById('taskbarDate');
  if (timeElem) timeElem.textContent = `${hours}:${mins}`;
  if (dateElem) dateElem.textContent = day;
}
updateClock();
setInterval(updateClock, 60000);

// Calendar Modal Toggle
const calendarTrigger = document.getElementById('taskbarDate');
const calendarModal = document.getElementById('calendarModal');

if (calendarTrigger && calendarModal) {
  calendarTrigger.style.cursor = 'pointer';
  calendarTrigger.addEventListener('click', (e) => {
    e.stopPropagation();
    calendarModal.style.display = calendarModal.style.display === 'block' ? 'none' : 'block';
  });

  document.addEventListener('click', (e) => {
    if (!calendarModal.contains(e.target) && !calendarTrigger.contains(e.target)) {
      calendarModal.style.display = 'none';
    }
  });
}

// Calendar Navigation
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();

const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const monthLabel = document.getElementById('calendarMonth');

function renderCalendar(year, month) {
  const container = document.getElementById('calendarBody');
  const weekdays = document.getElementById('calendarWeekdays');
  if (!container || !monthLabel) return;

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  monthLabel.textContent = `${monthNames[month]} ${year}`;

  container.innerHTML = '';

  for (let i = 0; i < firstDay; i++) {
    const blank = document.createElement('div');
    blank.classList.add('calendar-day', 'blank');
    container.appendChild(blank);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dateStr = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    const dayBox = document.createElement('div');
    dayBox.classList.add('calendar-day');
    dayBox.textContent = day;

    const today = new Date();
    if (year === today.getFullYear() && month === today.getMonth() && day === today.getDate()) {
      dayBox.classList.add('calendar-today');
    }

    projects.forEach(project => {
      if (project.date === dateStr) {
        const event = document.createElement('a');
        event.classList.add('calendar-event', `type-${project.type}`);
        event.href = project.link;
        event.textContent = project.title;
        dayBox.appendChild(event);
      }
    });

    container.appendChild(dayBox);
  }
}

if (prevMonthBtn && nextMonthBtn) {
  prevMonthBtn.addEventListener('click', () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    renderCalendar(currentYear, currentMonth);
  });

  nextMonthBtn.addEventListener('click', () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    renderCalendar(currentYear, currentMonth);
  });
}

renderCalendar(currentYear, currentMonth);

document.addEventListener('DOMContentLoaded', function() {
  // File Tree Filter
  document.querySelectorAll('.file-tree li').forEach(item => {
    item.addEventListener('click', function() {
      document.querySelectorAll('.file-tree li').forEach(li => li.classList.remove('active'));
      this.classList.add('active');
      const filter = this.getAttribute('data-filter');
      document.querySelectorAll('.gallery-item').forEach(card => {
        if (filter === 'all' || card.classList.contains('type-' + filter)) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // PPT Thumbs/Main Slide/Notes
  const thumbs = document.querySelectorAll('.ppt-thumb');
  const mainImage = document.getElementById('mainSlide');
  const slideNote = document.getElementById('slideNote');

  if (thumbs.length > 0 && mainImage && slideNote) {
    mainImage.src = thumbs[0].getAttribute('data-image');
    slideNote.innerHTML = thumbs[0].getAttribute('data-note') || '';
  }

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', function() {
      thumbs.forEach(t => t.classList.remove('selected'));
      this.classList.add('selected');
      mainImage.src = this.getAttribute('data-image');
      slideNote.innerHTML = this.getAttribute('data-note') || '';
    });
  });
});


  document.addEventListener('click', function (e) {
    const isInsideFrame = e.target.closest('.frame');
    const onProjectsPage = window.location.href.includes('projects.html');

    if (!isInsideFrame && !onProjectsPage) {
      window.location.href = 'projects.html';
    }
  });
