/**
 * 布丁狗画廊页面交互脚本
 * 包含照片筛选、加载更多和点赞功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 照片筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新按钮活动状态
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.dataset.filter;
            
            // 筛选照片
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.dataset.category === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // 加载更多功能
    const loadMoreBtn = document.querySelector('.load-more .btn');
    let visibleItems = 8; // 初始显示的项目数
    
    // 初始隐藏多余项目
    galleryItems.forEach((item, index) => {
        if (index >= visibleItems) {
            item.style.display = 'none';
        }
    });
    
    loadMoreBtn.addEventListener('click', function() {
        // 显示更多项目
        const hiddenItems = Array.from(galleryItems).filter(item => 
            item.style.display === 'none' || !item.style.display
        );
        
        const itemsToShow = hiddenItems.slice(0, 4); // 每次显示4个
        
        itemsToShow.forEach(item => {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
            }, 50);
        });
        
        // 如果没有更多项目可显示，隐藏按钮
        if (hiddenItems.length <= 4) {
            loadMoreBtn.style.display = 'none';
        }
    });
    
    // 点赞功能
    const likeButtons = document.querySelectorAll('.photo-meta span:first-child, .fan-like');
    
    likeButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // 防止触发lightbox
            
            const icon = this.querySelector('i') || this;
            const currentCount = parseInt(this.textContent.match(/\d+/) || 0);
            
            // 切换点赞状态
            if (icon.classList.contains('liked')) {
                icon.classList.remove('liked', 'fas');
                icon.classList.add('far');
                this.innerHTML = this.innerHTML.replace(currentCount, currentCount - 1);
            } else {
                icon.classList.remove('far');
                icon.classList.add('fas', 'liked');
                this.innerHTML = this.innerHTML.replace(currentCount, currentCount + 1);
                
                // 添加动画效果
                icon.style.transform = 'scale(1.5)';
                setTimeout(() => {
                    icon.style.transform = 'scale(1)';
                }, 300);
            }
        });
    });
    
    // 图片懒加载
    const lazyLoadImages = document.querySelectorAll('.gallery-item img, .fan-photo img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const src = image.dataset.src || image.src;
                    
                    // 确保只加载一次
                    if (src && !image.loaded) {
                        image.src = src;
                        image.loaded = true;
                        image.style.opacity = '1';
                        observer.unobserve(image);
                    }
                }
            });
        }, {
            rootMargin: '200px 0px',
            threshold: 0.01
        });
        
        lazyLoadImages.forEach(image => {
            image.style.opacity = '0';
            image.style.transition = 'opacity 0.5s ease';
            imageObserver.observe(image);
        });
    }
    
    // 视频悬停预览
    const videoItems = document.querySelectorAll('.video-item');
    
    videoItems.forEach(item => {
        let iframe = item.querySelector('iframe');
        let isPlaying = false;
        let originalSrc = iframe.src;
        
        item.addEventListener('mouseenter', function() {
            if (!isPlaying) {
                iframe.src = originalSrc + '&autoplay=1&mute=1';
                isPlaying = true;
            }
        });
        
        item.addEventListener('mouseleave', function() {
            if (isPlaying) {
                iframe.src = originalSrc;
                isPlaying = false;
            }
        });
    });
});