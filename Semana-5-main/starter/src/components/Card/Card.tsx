// ============================================
// PROYECTO SEMANA 05: Sistema de Configuración UI
// DOMINIO: Productora Audiovisual
// Archivo: components/Card/Card.tsx
// ============================================

import React, {
  createContext,
  useContext,
  type ReactNode,
  type CSSProperties,
  type ElementType,
} from 'react';
import { useConfig } from '../../contexts/ConfigContext';

// ============================================
// CONTEXT INTERNO
// ============================================

interface CardContextValue {
  variant?: 'default' | 'outlined' | 'elevated';
}

const CardContext = createContext<CardContextValue | undefined>(undefined);

const useCardContext = () => {
  const context = useContext(CardContext);
  if (!context) {
    throw new Error('Card components must be used within a Card');
  }
  return context;
};

// ============================================
// CARD ROOT
// ============================================

interface CardRootProps {
  children: ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  className?: string;
  style?: CSSProperties;
}

const CardRoot: React.FC<CardRootProps> = ({
  children,
  variant = 'default',
  className = '',
  style,
}) => {
  const { config } = useConfig();
  
  // Aplicar estilos según configuración global
  const densityClasses = {
    compact: 'card-compact',
    normal: 'card-normal',
    spacious: 'card-spacious',
  };

  const variantClasses = {
    default: 'card-default',
    outlined: 'card-outlined',
    elevated: 'card-elevated',
  };

  return (
    <CardContext.Provider value={{ variant }}>
      <div
        className={`card ${densityClasses[config.density]} ${variantClasses[variant]} ${className}`}
        style={style}
        data-theme={config.theme === 'system' ? undefined : config.theme}
        data-font-size={config.fontSize}
      >
        {children}
      </div>
    </CardContext.Provider>
  );
};

// ============================================
// CARD HEADER
// ============================================

interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`card-header ${className}`}>
      {children}
    </div>
  );
};

// ============================================
// CARD TITLE
// ============================================

interface CardTitleProps {
  children: ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ 
  children, 
  as: Tag = 'h3',
  className = '',
}) => {
  return <Tag className={`card-title ${className}`}>{children}</Tag>;
};

// ============================================
// CARD ACTIONS
// ============================================

interface CardActionsProps {
  children: ReactNode;
  className?: string;
}

const CardActions: React.FC<CardActionsProps> = ({ children, className = '' }) => {
  return (
    <div className={`card-actions ${className}`}>
      {children}
    </div>
  );
};

// ============================================
// CARD BODY
// ============================================

interface CardBodyProps {
  children: ReactNode;
  className?: string;
}

const CardBody: React.FC<CardBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`card-body ${className}`}>
      {children}
    </div>
  );
};

// ============================================
// CARD FOOTER
// ============================================

interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`card-footer ${className}`}>
      {children}
    </div>
  );
};

// ============================================
// CARD IMAGE (Extra para Productora Audiovisual)
// ============================================

interface CardImageProps {
  src: string;
  alt: string;
  className?: string;
}

const CardImage: React.FC<CardImageProps> = ({ src, alt, className = '' }) => {
  return (
    <div className={`card-image ${className}`}>
      <img src={src} alt={alt} />
    </div>
  );
};

// ============================================
// CARD BADGE (Extra para estados de proyecto)
// ============================================

interface CardBadgeProps {
  children: ReactNode;
  variant?: 'success' | 'warning' | 'error' | 'info' | 'default';
  className?: string;
}

const CardBadge: React.FC<CardBadgeProps> = ({ 
  children, 
  variant = 'default',
  className = '',
}) => {
  return (
    <span className={`card-badge badge-${variant} ${className}`}>
      {children}
    </span>
  );
};

// ============================================
// COMPOUND COMPONENT EXPORT
// ============================================

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Title: CardTitle,
  Actions: CardActions,
  Body: CardBody,
  Footer: CardFooter,
  Image: CardImage,
  Badge: CardBadge,
});

// ============================================
// TIPOS EXPORTADOS
// ============================================

export type { 
  CardRootProps, 
  CardHeaderProps, 
  CardTitleProps, 
  CardActionsProps,
  CardBodyProps,
  CardFooterProps,
  CardImageProps,
  CardBadgeProps,
};