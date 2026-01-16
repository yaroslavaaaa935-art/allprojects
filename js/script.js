// Карточки проектов
const tasks = [
    { 
        id: 1, 
        name: "Задание 1: Портфолио", 
        url: "https://yaroslavaaaa935-art.github.io/Portfolio/", 
        icon: "fas fa-user",
        description: "Сайт портфолио-резюме о себе"
    },
    { 
        id: 2, 
        name: "Задание 2: Дашборд", 
        url: "https://yaroslavaaaa935-art.github.io/dashboard.github.io/", 
        icon: "fas fa-chart-line",
        description: "Интерактивная панель управления UI-компонентами"
    },
    { 
        id: 3, 
        name: "Задание 3: Игра-платформер", 
        url: "https://yaroslavaaaa935-art.github.io/game.github.io/", 
        icon: "fas fa-gamepad",
        description: "Веб-игра в жанре платформер с использованием JavaScript"
    },
    { 
        id: 4, 
        name: "Задание 4: To-Do List", 
        url: "https://yaroslavaaaa935-art.github.io/to-do-list/", 
        icon: "fas fa-tasks",
        description: "Приложение для планирования задач"
    },
    { 
        id: 5, 
        name: "Задание 5: Интернет магазин", 
        url: "https://yaroslavaaaa935-art.github.io/webstore/", 
        icon: "fas fa-shopping-cart",
        description: "Интернет магазин для ювелирной продукции"
    },
    { 
        id: 6, 
        name: "Задание 6: Сайт для агенства «Режим полета»", 
        url: "https://yaroslavaaaa935-art.github.io/", 
        icon: "fas fa-plane",
        description: "Аналог сайта для агенства «Режим полета»"
    }
];

const finalProject = {
    id: 99,
    name: "Итоговый проект",
    url: "https://yaroslavaaaa935-art.github.io/restaurant/",
    icon: "fas fa-trophy",
    description: "Сайт для ресторана с онлайн-заказом"
};

/**
 * Инициализация приложения
 */
document.addEventListener('DOMContentLoaded', function() {
    console.log('Сайт загружен');
    
    // Текущий год
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }
    
    // Счетчик заданий
    const tasksCount = document.getElementById('tasksCount');
    if (tasksCount) {
        tasksCount.textContent = tasks.length;
    }
    
    // Инициализация темы
    initTheme();
    
    // Рендер всех элементов
    renderAll();
    
    // Настройка навигации
    setupNavigation();
    
    // Настройка модального окна
    setupModal();
});

/**
 * Рендер всех элементов
 */
function renderAll() {
    renderTasks();
    renderFinalProject();
}

/**
 * Рендер заданий
 */
function renderTasks() {
    const tasksGrid = document.getElementById('tasksGrid');
    if (!tasksGrid) return;
    
    tasksGrid.innerHTML = '';
    
    tasks.forEach(task => {
        const taskCard = document.createElement('div');
        taskCard.className = 'task-card';
        taskCard.innerHTML = `
            <span class="task-number">#${task.id}</span>
            <div class="task-icon">
                <i class="${task.icon}"></i>
            </div>
            <h3>${task.name}</h3>
            <p>${task.description}</p>
        `;
        
        // Обработчик клика для заданий
        taskCard.addEventListener('click', function(e) {
            console.log('Открываем задание:', task.url);
            window.open(task.url, '_blank', 'noopener,noreferrer');
        });
        
        tasksGrid.appendChild(taskCard);
    });
}

/**
 * РЕНДЕРИНГ ИТОГОВОГО ПРОЕКТА
 */
function renderFinalProject() {
    const finalProjectCard = document.getElementById('finalProjectCard');
    if (!finalProjectCard) {
        console.error('finalProjectCard не найден');
        return;
    }
    
    console.log('Рендерим итоговый проект с URL:', finalProject.url);
    
    // Создаем явную ссылку <a> вместо div
    finalProjectCard.innerHTML = '';
    
    const link = document.createElement('a');
    link.href = finalProject.url;
    link.target = '_blank';
    link.className = 'final-card-link';
    link.style.textDecoration = 'none';
    link.style.color = 'inherit';
    link.style.display = 'block';
    
    link.innerHTML = `
        <div class="final-card">
            <span class="final-badge">Итог</span>
            <div class="final-icon">
                <i class="${finalProject.icon}"></i>
            </div>
            <h3>${finalProject.name}</h3>
            <p>${finalProject.description}</p>
        </div>
    `;
    

    

    
    // И обработчик на карточку через делегирование
    document.addEventListener('click', function(e) {
        if (e.target.closest('.final-card')) {
            console.log('Делегированный клик по final-card');
            window.open(finalProject.url, '_blank');
            e.preventDefault();
        }
    });
    
    finalProjectCard.appendChild(link);
}

/**
 * НАСТРОЙКА НАВИГАЦИИ
 */
function setupNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const tasksSection = document.getElementById('tasksSection');
    const finalSection = document.getElementById('finalSection');
    
    if (!navButtons.length || !tasksSection || !finalSection) return;
    
    navButtons.forEach(button => {
        button.addEventListener('click', function() {
            console.log('Нажата кнопка:', this.getAttribute('data-target'));
            
            // Снимаем активный класс со всех кнопок
            navButtons.forEach(btn => btn.classList.remove('active'));
            
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            
            // Определяем, какую секцию показать
            const target = this.getAttribute('data-target');
            
            // Скрываем все секции
            tasksSection.classList.remove('active-section');
            finalSection.classList.remove('active-section');
            
            // Показываем нужную секцию
            if (target === 'tasks') {
                tasksSection.classList.add('active-section');
            } else if (target === 'final') {
                finalSection.classList.add('active-section');
            }
        });
    });
}

/**
 * НАСТРОЙКА ТЕМЫ
 */
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    if (!themeToggle) return;
    
    const themeIcon = themeToggle.querySelector('i');
    const themeText = themeToggle.querySelector('.theme-text');
    
    // Проверяем сохраненную тему
    let currentTheme = localStorage.getItem('theme') || 'dark';
    
    function applyTheme(theme) {
        document.body.className = theme === 'dark' ? '' : 'light-theme';
        
        if (theme === 'dark') {
            themeIcon.className = 'fas fa-moon';
            themeText.textContent = 'Тёмная';
        } else {
            themeIcon.className = 'fas fa-sun';
            themeText.textContent = 'Светлая';
        }
        
        localStorage.setItem('theme', theme);
        currentTheme = theme;
    }
    
    // Применяем тему
    applyTheme(currentTheme);
    
    // Обработчик переключения темы
    themeToggle.addEventListener('click', function() {
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        applyTheme(newTheme);
    });
}

/**
 * НАСТРОЙКА МОДАЛЬНОГО ОКНА
 */
function setupModal() {
    const helpBtn = document.getElementById('helpBtn');
    const helpModal = document.getElementById('helpModal');
    const closeHelpModal = document.getElementById('closeHelpModal');
    
    if (!helpBtn || !helpModal || !closeHelpModal) return;
    
    // Открытие модального окна
    helpBtn.addEventListener('click', function() {
        helpModal.style.display = 'flex';
    });
    
    // Закрытие модального окна
    closeHelpModal.addEventListener('click', function() {
        helpModal.style.display = 'none';
    });
    
    // Закрытие по клику вне окна
    helpModal.addEventListener('click', function(event) {
        if (event.target === this) {
            helpModal.style.display = 'none';
        }
    });
    
    // Закрытие по Escape
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && helpModal.style.display === 'flex') {
            helpModal.style.display = 'none';
        }
    });
}