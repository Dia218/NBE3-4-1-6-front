# NBE3-4-1-6-front

프로그래머스 데브코스 프로젝트 프론트엔드 (Next.js)

>

### 디렉터리 구조

```
├───app
│   │   favicon.ico
│   │   globals.css
│   │   layout.tsx
│   │   page.tsx
│   │
│   ├───buyer
│   │   ├───cart
│   │   │       page.tsx
│   │   │
│   │   ├───email-input
│   │   │       page.tsx
│   │   │
│   │   ├───order-history
│   │   │       page.tsx
│   │   │
│   │   ├───payment-complete
│   │   │       page.tsx
│   │   │
│   │   ├───product-list
│   │   │       page.tsx
│   │   │
│   │   └───shipping-detail
│   │           page.tsx
│   │
│   ├───common
│   │   └───error
│   │           page.tsx
│   │
│   └───seller
│       ├───order-management
│       │       page.tsx
│       │
│       ├───password-input
│       │       page.tsx
│       │
│       └───product-management
│               page.tsx
│
├───components
│   └───ProductBox
│           ProductBoxBase.module.css
│           ProductBoxBase.stories.tsx
│           ProductBoxBase.tsx
│           ProductBoxOption.module.css
│           ProductBoxOption.tsx
│
├───lib
│   ├───api # API 서비스
│   │       buyerOrderService.ts
│   │       buyerProductService.ts
│   │       deliveryService.ts
│   │       sellerOrderService.ts
│   │       sellerProductService.ts
│   │
│   ├───store # 애플리케이션 상태 관리
│   └───types # DTO 정의
│           addressDTO.ts
│           deliveryDTO.ts
│           orderDetailDTO.ts
│           orderDTO.ts
│           orderStatusDTO.ts
│           productDTO.ts
│
├───stories # StoryBook tool 실행을 위한 폴더
│
└───tests
    ├───app
    └───components
            ProductBoxBase.test.tsx
```
