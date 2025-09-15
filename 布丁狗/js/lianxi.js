/**
 * 布丁狗联系页面交互脚本
 * 包含表单验证、地图初始化和FAQ交互
 */

document.addEventListener('DOMContentLoaded', function() {
    // 表单验证
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('successMessage');
    const backToFormBtn = document.getElementById('backToForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // 重置错误消息
            document.querySelectorAll('.error-message').forEach(el => {
                el.style.display = 'none';
            });
            
            let isValid = true;
            
            // 验证姓名
            const nameInput = document.getElementById('name');
            if (nameInput.value.trim() === '') {
                document.getElementById('nameError').textContent = '请输入您的姓名';
                document.getElementById('nameError').style.display = 'block';
                isValid = false;
            }
            
            // 验证邮箱
            const emailInput = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (emailInput.value.trim() === '') {
                document.getElementById('emailError').textContent = '请输入您的电子邮箱';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            } else if (!emailRegex.test(emailInput.value)) {
                document.getElementById('emailError').textContent = '请输入有效的电子邮箱';
                document.getElementById('emailError').style.display = 'block';
                isValid = false;
            }
            
            // 验证主题
            const subjectInput = document.getElementById('subject');
            if (subjectInput.value === '' || !subjectInput.value) {
                document.getElementById('subjectError').textContent = '请选择主题';
                document.getElementById('subjectError').style.display = 'block';
                isValid = false;
            }
            
            // 验证留言内容
            const messageInput = document.getElementById('message');
            if (messageInput.value.trim() === '') {
                document.getElementById('messageError').textContent = '请输入留言内容';
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            } else if (messageInput.value.trim().length < 10) {
                document.getElementById('messageError').textContent = '留言内容至少需要10个字符';
                document.getElementById('messageError').style.display = 'block';
                isValid = false;
            }
            
            // 验证reCAPTCHA
            const captchaResponse = grecaptcha.getResponse();
            if (captchaResponse.length === 0) {
                document.getElementById('captchaError').textContent = '请完成验证码验证';
                document.getElementById('captchaError').style.display = 'block';
                isValid = false;
            }
            
            // 如果表单有效，显示成功消息
            if (isValid) {
                contactForm.style.display = 'none';
                successMessage.style.display = 'block';
                
                // 这里可以添加AJAX提交表单的代码
                // ...
            }
        });
    }
    
    // 返回表单按钮
    if (backToFormBtn) {
        backToFormBtn.addEventListener('click', function() {
            successMessage.style.display = 'none';
            contactForm.style.display = 'block';
            contactForm.reset();
            grecaptcha.reset();
        });
    }
    
    // 初始化地图
    function initMap() {
        // 设置地图中心坐标（示例坐标，请替换为实际地址）
        const mapCenter = [39.9042, 116.4074]; // 北京坐标
        
        // 创建地图实例
        const map = L.map('mapCanvas').setView(mapCenter, 15);
        
        // 添加地图图层
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; OpenStreetMap contributors'
        }).addTo(map);
        
        // 添加标记
        const customIcon = L.icon({
            iconUrl: 'images/map-marker.png',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40]
        });
        
        L.marker(mapCenter, {icon: customIcon}).addTo(map)
            .bindPopup("<b>布丁狗粉丝俱乐部</b><br>北京市朝阳区布丁街123号")
            .openPopup();
    }
    
    // 当页面完全加载后初始化地图
    window.addEventListener('load', initMap);
    
    // FAQ交互
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const item = this.parentElement;
            item.classList.toggle('active');
            
            // 关闭其他打开的FAQ
            faqQuestions.forEach(q => {
                if (q !== this && q.parentElement.classList.contains('active')) {
                    q.parentElement.classList.remove('active');
                }
            });
        });
    });
    
    // 平滑滚动到表单
    const formLinks = document.querySelectorAll('a[href="#contactForm"]');
    
    formLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            document.querySelector('#contactForm').scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});