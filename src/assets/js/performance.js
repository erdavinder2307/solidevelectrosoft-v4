/**
 * Performance Optimization Script for Solidev Electrosoft Website
 * Handles lazy loading, image optimization, and performance monitoring
 */

(function() {
    'use strict';

    // Intersection Observer for lazy loading
    function initLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    // Preload critical images
    function preloadCriticalImages() {
        const criticalImages = [
            'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/logo/logo.png',
            'https://solidevwebsitev3.blob.core.windows.net/solidev/assets/img/bg/newbgimage/lightforyourbusiness.webp'
        ];

        criticalImages.forEach(src => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            document.head.appendChild(link);
        });
    }

    // Optimize font loading
    function optimizeFontLoading() {
        if ('fonts' in document) {
            // Load critical fonts first
            document.fonts.load('1em "DM Sans"').then(() => {
                document.body.classList.add('fonts-loaded');
            });
        }
    }

    // Performance monitoring
    function initPerformanceMonitoring() {
        if ('PerformanceObserver' in window) {
            // Monitor Largest Contentful Paint
            const lcpObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('LCP:', entry.startTime);
                }
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Monitor First Input Delay
            const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.log('FID:', entry.processingStart - entry.startTime);
                }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }
    }

    // Service Worker registration for caching
    function initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }

    // Initialize all performance optimizations
    function init() {
        document.addEventListener('DOMContentLoaded', () => {
            initLazyLoading();
            preloadCriticalImages();
            optimizeFontLoading();
            initPerformanceMonitoring();
            initServiceWorker();
        });
    }

    // Start initialization
    init();

})();
