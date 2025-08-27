import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustIndicators = () => {
  const trustBadges = [
    {
      id: 'ssl',
      icon: 'Shield',
      title: 'SSL Secured',
      description: 'Your data is encrypted'
    },
    {
      id: 'privacy',
      icon: 'Lock',
      title: 'Privacy Protected',
      description: 'No data stored or shared'
    },
    {
      id: 'accurate',
      icon: 'CheckCircle',
      title: 'Accurate Calculations',
      description: 'Industry-standard formulas'
    }
  ];

  return (
    <div className="bg-muted/20 rounded-lg border border-border/50 p-4">
      <div className="flex items-center justify-center space-x-8">
        {trustBadges?.map((badge) => (
          <div key={badge?.id} className="flex items-center space-x-2 text-center">
            <div className="flex items-center justify-center w-6 h-6 bg-accent/10 rounded-full">
              <Icon name={badge?.icon} size={12} color="var(--color-accent)" />
            </div>
            <div className="hidden sm:block">
              <div className="text-xs font-medium text-foreground">{badge?.title}</div>
              <div className="text-xs text-muted-foreground">{badge?.description}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustIndicators;