// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://donatedz.store/donate-backend',
    
    // API Endpoints
    ENDPOINTS: {
        LOGIN: '/api/login.php',
        REGISTER: '/api/register.php',
        UPDATE_PROFILE: '/api/update_profile.php',
        CHANGE_PASSWORD: '/api/change_password.php',
        UPLOAD_PROFILE_IMAGE: '/api/upload_profile_image.php',
        GET_FAMILIES: '/api/families.php',
        GET_DONATION_HISTORY: '/api/donation-history.php',
        TEST_CONNECTION: '/api/test_connection.php',
        DONATE: '/api/donate.php',
        
        ADMIN: {
            USERS: '/api/admin/get_users.php',
            FAMILIES: '/api/admin/get_families.php',
            DONATIONS: '/api/admin/get_donations.php',
            DELETE_USER: '/api/admin/delete_user.php',
            DELETE_FAMILY: '/api/admin/delete_family.php',
            DELETE_DONATION: '/api/admin/delete_donation.php'
        }
    },
    NETWORK: {
        TIMEOUT: 30000, // 30 seconds
        RETRY_ATTEMPTS: 3,
        RETRY_DELAY: 2000, // 2 seconds
    },
    ERROR_MESSAGES: {
        NETWORK_ERROR: 'حدث خطأ في الاتصال بالخادم',
        TIMEOUT_ERROR: 'انتهت مهلة الاتصال بالخادم',
        SERVER_ERROR: 'حدث خطأ في الخادم',
        INVALID_RESPONSE: 'استجابة غير صالحة من الخادم',
        UPDATE_PROFILE_ERROR: 'فشل تحديث الملف الشخصي',
        CHANGE_PASSWORD_ERROR: 'فشل تغيير كلمة المرور',
        UPLOAD_IMAGE_ERROR: 'فشل رفع الصورة',
        LOGIN_REQUIRED: 'يرجى تسجيل الدخول أولاً',
    },
    SUCCESS_MESSAGES: {
        UPDATE_PROFILE_SUCCESS: 'تم تحديث الملف الشخصي بنجاح',
        CHANGE_PASSWORD_SUCCESS: 'تم تغيير كلمة المرور بنجاح',
        UPLOAD_IMAGE_SUCCESS: 'تم رفع الصورة بنجاح',
    },
};

// Colors
export const COLORS = {
    PRIMARY: '#007AFF',
    SECONDARY: '#5856D6',
    SUCCESS: '#34C759',
    DANGER: '#FF3B30',
    WARNING: '#FF9500',
    INFO: '#5856D6',
    LIGHT: '#F2F2F7',
    DARK: '#1C1C1E',
    WHITE: '#FFFFFF',
    BLACK: '#000000',
    GRAY: '#8E8E93',
    GRAY_LIGHT: '#C7C7CC',
    GRAY_DARK: '#636366',
    TRANSPARENT: 'transparent',
};

// Typography
export const TYPOGRAPHY = {
    FONT_FAMILY: {
        REGULAR: 'System',
        MEDIUM: 'System',
        BOLD: 'System',
    },
    FONT_SIZE: {
        XS: 12,
        SM: 14,
        MD: 16,
        LG: 18,
        XL: 20,
        XXL: 24,
        XXXL: 32,
    },
    LINE_HEIGHT: {
        XS: 16,
        SM: 20,
        MD: 24,
        LG: 28,
        XL: 32,
        XXL: 36,
        XXXL: 44,
    },
};

// Spacing
export const SPACING = {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 40,
};

// Border Radius
export const BORDER_RADIUS = {
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 24,
    round: 9999,
};

// Layout Constants
export const LAYOUT = {
    screenPadding: SPACING.md,
    cardPadding: SPACING.md,
    inputHeight: 55,
    buttonHeight: 55,
    iconSize: 24,
}; 