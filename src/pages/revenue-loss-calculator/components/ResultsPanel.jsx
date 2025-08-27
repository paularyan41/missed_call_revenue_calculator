import React from 'react';
import Icon from '../../../components/AppIcon';

const ResultsPanel = ({ calculations }) => {
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const resultCards = [
    {
      id: 'daily',
      title: 'Daily Revenue Loss',
      value: calculations?.daily,
      icon: 'Calendar',
      color: 'text-error',
      bgColor: 'bg-error/10',
      iconColor: 'var(--color-error)',
      description: 'Lost revenue per day'
    },
    {
      id: 'weekly',
      title: 'Weekly Revenue Loss',
      value: calculations?.weekly,
      icon: 'CalendarDays',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      iconColor: 'var(--color-warning)',
      description: 'Lost revenue per week (7 days)'
    },
    {
      id: 'monthly',
      title: 'Monthly Revenue Loss',
      value: calculations?.monthly,
      icon: 'CalendarRange',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
      iconColor: 'var(--color-destructive)',
      description: 'Lost revenue per month (30 days)'
    },
    {
      id: 'annual',
      title: 'Annual Revenue Loss',
      value: calculations?.annual,
      icon: 'CalendarX2',
      color: 'text-error',
      bgColor: 'bg-error/10',
      iconColor: 'var(--color-error)',
      description: 'Lost revenue per year (365 days)'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-2 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
          <Icon name="TrendingDown" size={20} color="var(--color-accent)" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Revenue Loss Analysis</h2>
          <p className="text-sm text-muted-foreground">Calculated impact across time periods</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {resultCards?.map((card) => (
          <div
            key={card?.id}
            className="bg-background rounded-lg border border-border p-4 hover:shadow-elevation-2 transition-hover"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`flex items-center justify-center w-8 h-8 ${card?.bgColor} rounded-lg`}>
                <Icon name={card?.icon} size={16} color={card?.iconColor} />
              </div>
              <div className="text-right">
                <div className={`text-2xl font-bold ${card?.color} leading-tight`}>
                  {formatCurrency(card?.value)}
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium text-foreground mb-1">{card?.title}</h3>
              <p className="text-xs text-muted-foreground">{card?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-muted/30 rounded-lg p-4 border border-border/50">
        <div className="flex items-start space-x-3">
          <Icon name="AlertTriangle" size={16} color="var(--color-warning)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-1">Business Impact</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              These calculations represent potential revenue opportunities. Consider implementing call forwarding, 
              voicemail systems, or additional staff to capture missed business opportunities.
            </p>
          </div>
        </div>
      </div>
      {calculations?.annual > 0 && (
        <div className="mt-4 bg-primary/5 rounded-lg p-4 border border-primary/20">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-primary mb-1">Opportunity Insight</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Your annual revenue loss of <span className="font-medium text-foreground">{formatCurrency(calculations?.annual)}</span> could 
                justify investing in call management solutions or additional customer service resources.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultsPanel;