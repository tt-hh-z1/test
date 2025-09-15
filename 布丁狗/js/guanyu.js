/**
 * 布丁狗关于页面交互脚本
 * 包含时间线和小测验功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 小测验功能
    const quizQuestions = document.querySelectorAll('.quiz-question');
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizPrevBtn = document.getElementById('quiz-prev');
    const quizNextBtn = document.getElementById('quiz-next');
    const quizSubmitBtn = document.getElementById('quiz-submit');
    const quizResult = document.querySelector('.quiz-result');
    const quizScore = document.getElementById('quiz-score');
    const quizMessage = document.getElementById('quiz-message');
    const quizRestartBtn = document.getElementById('quiz-restart');
    
    let currentQuestion = 0;
    let score = 0;
    const totalQuestions = quizQuestions.length;
    
    // 显示当前问题
    function showQuestion(index) {
        quizQuestions.forEach((question, i) => {
            question.classList.toggle('active', i === index);
        });
        
        // 更新导航按钮状态
        quizPrevBtn.disabled = index === 0;
        quizNextBtn.style.display = index === totalQuestions - 1 ? 'none' : 'block';
        quizSubmitBtn.style.display = index === totalQuestions - 1 ? 'block' : 'none';
    }
    
    // 选择答案
    quizOptions.forEach(option => {
        option.addEventListener('click', function() {
            // 移除同问题的其他选项的选中状态
            const questionIndex = parseInt(this.closest('.quiz-question').dataset.index);
            const options = this.closest('.quiz-options').querySelectorAll('.quiz-option');
            
            options.forEach(opt => {
                if (opt !== this) {
                    opt.classList.remove('selected');
                }
            });
            
            // 切换当前选项的选中状态
            this.classList.toggle('selected');
        });
    });
    
    // 上一题
    quizPrevBtn.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
        }
    });
    
    // 下一题
    quizNextBtn.addEventListener('click', function() {
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });
    
    // 提交测验
    quizSubmitBtn.addEventListener('click', function() {
        // 计算得分
        score = 0;
        const selectedOptions = document.querySelectorAll('.quiz-option.selected');
        
        selectedOptions.forEach(option => {
            if (option.classList.contains('correct')) {
                score++;
            } else {
                option.classList.add('incorrect');
            }
        });
        
        // 显示所有正确答案
        document.querySelectorAll('.quiz-option.correct').forEach(option => {
            if (!option.classList.contains('selected')) {
                option.classList.add('show-correct');
            }
        });
        
        // 显示结果
        quizScore.textContent = score;
        
        if (score === totalQuestions) {
            quizMessage.textContent = '太棒了！你是真正的布丁狗专家！';
        } else if (score >= totalQuestions / 2) {
            quizMessage.textContent = '不错哦！你对布丁狗很了解！';
        } else {
            quizMessage.textContent = '继续加油！多了解布丁狗吧！';
        }
        
        // 隐藏问题，显示结果
        document.querySelector('.quiz-question.active').classList.remove('active');
        quizResult.style.display = 'block';
    });
    
    // 重新开始测验
    quizRestartBtn.addEventListener('click', function() {
        // 重置状态
        currentQuestion = 0;
        score = 0;
        
        // 清除所有选择
        document.querySelectorAll('.quiz-option').forEach(option => {
            option.classList.remove('selected', 'incorrect', 'show-correct');
        });
        
        // 隐藏结果，显示第一个问题
        quizResult.style.display = 'none';
        showQuestion(0);
    });
    
    // 初始化测验
    quizQuestions.forEach((question, index) => {
        question.dataset.index = index;
    });
    
    showQuestion(0);
    
    // 时间线动画
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function checkTimeline() {
        const triggerBottom = window.innerHeight / 5 * 4;
        
        timelineItems.forEach(item => {
            const itemTop = item.getBoundingClientRect().top;
            
            if (itemTop < triggerBottom) {
                item.classList.add('show');
            }
        });
    }
    
    // 初始检查
    checkTimeline();
    
    // 滚动时检查
    window.addEventListener('scroll', checkTimeline);
});