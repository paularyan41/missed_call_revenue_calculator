import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CalculationSummary = ({ averageJobValue, missedCallsPerDay, calculations }) => {
  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  const handleExport = () => {
    const summaryData = {
      calculationDate: new Date()?.toLocaleDateString('en-US'),
      inputs: {
        averageJobValue: parseFloat(averageJobValue) || 0,
        missedCallsPerDay: parseInt(missedCallsPerDay) || 0
      },
      results: calculations
    };

    const dataStr = JSON.stringify(summaryData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `revenue-loss-analysis-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    link?.click();
    URL.revokeObjectURL(url);
  };

  if (!averageJobValue || !missedCallsPerDay) {
    return null;
  }

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
            <Icon name="FileText" size={20} color="var(--color-secondary)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Calculation Summary</h2>
            <p className="text-sm text-muted-foreground">Analysis overview and export</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExport}
          iconName="Download"
          iconPosition="left"
          className="text-muted-foreground hover:text-primary"
        >
          Export
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="DollarSign" size={16} color="var(--color-primary)" />
            <span className="text-sm font-medium text-foreground">Average Job Value</span>
          </div>
          <div className="text-xl font-bold text-primary">
            {formatCurrency(parseFloat(averageJobValue) || 0)}
          </div>
        </div>

        <div className="bg-background rounded-lg border border-border p-4">
          <div className="flex items-center space-x-3 mb-2">
            <Icon name="PhoneMissed" size={16} color="var(--color-error)" />
            <span className="text-sm font-medium text-foreground">Missed Calls/Day</span>
          </div>
          <div className="text-xl font-bold text-error">
            {parseInt(missedCallsPerDay) || 0} calls
          </div>
        </div>
      </div>
      <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
        <div className="flex items-start space-x-3">
          <Icon name="Calculator" size={16} color="var(--color-accent)" className="mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-foreground mb-2">Quick Analysis</h4>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-muted-foreground">Daily Loss:</span>
                <span className="ml-2 font-medium text-error">{formatCurrency(calculations?.daily)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Monthly Loss:</span>
                <span className="ml-2 font-medium text-destructive">{formatCurrency(calculations?.monthly)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Weekly Loss:</span>
                <span className="ml-2 font-medium text-warning">{formatCurrency(calculations?.weekly)}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Annual Loss:</span>
                <span className="ml-2 font-medium text-error">{formatCurrency(calculations?.annual)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculationSummary;