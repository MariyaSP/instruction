        // Генерация QR-кода
        new QRCode(document.getElementById("qrcode"), {
            text: window.location.href,
            width: 70,
            height: 70,
            colorDark: "#1a2a3a",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.M
        });

        // === ЧЕК-ЛИСТ С АВТОМАТИЧЕСКИМ СБРОСОМ ПРИ ОБНОВЛЕНИИ СТРАНИЦЫ ===
        // Нет сохранения в localStorage — каждый новый заход = чистый лист
        
        const checkboxes = document.querySelectorAll('.rule-check');
        const progressFill = document.getElementById('progressFill');
        const progressPercent = document.getElementById('progressPercent');
        const resetBtn = document.getElementById('resetBtn');

        // Функция обновления прогресс-бара
        function updateProgress() {
            const total = checkboxes.length;
            const checked = Array.from(checkboxes).filter(cb => cb.checked).length;
            const percent = Math.round((checked / total) * 100);
            progressFill.style.width = percent + '%';
            progressPercent.innerText = percent + '%';
        }

        // Сброс всех чекбоксов
        function resetAllCheckboxes() {
            checkboxes.forEach(cb => {
                cb.checked = false;
            });
            updateProgress();
        }

        // Обработчики событий
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateProgress);
        });

        resetBtn.addEventListener('click', resetAllCheckboxes);

        // При загрузке страницы — гарантированно сбрасываем всё в 0
        // (никакого localStorage, каждый раз начинаем с чистого листа)
        resetAllCheckboxes();