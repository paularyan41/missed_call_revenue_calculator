import React from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const InputPanel = ({ 
  averageJobValue, 
  setAverageJobValue, 
  missedCallsPerDay, 
  setMissedCallsPerDay, 
  onReset,
  errors 
}) => {
  const handleJobValueChange = (e) => {
    const value = e?.target?.value?.replace(/[^0-9.]/g, '');
    setAverageJobValue(value);
  };

  const handleMissedCallsChange = (e) => {
    const value = e?.target?.value?.replace(/[^0-9]/g, '');
    setMissedCallsPerDay(value);
  };

  return (
    <div className="bg-card rounded-lg border border-border shadow-elevation-2 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Calculator" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Input Parameters</h2>
            <p className="text-sm text-muted-foreground">Enter your business metrics</p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={onReset}
          iconName="RotateCcw"
          iconPosition="left"
          className="text-muted-foreground hover:text-primary"
        >
          Reset
        </Button>
      </div>
      <div className="space-y-6">
        <div>
          <Input
            label="Average Job Value per Customer"
            type="text"
            placeholder="Enter amount (e.g., 500)"
            value={averageJobValue}
            onChange={handleJobValueChange}
            error={errors?.averageJobValue}
            description="The average revenue you earn from each customer"
            required
            className="mb-1"
          />
          <div className="flex items-center space-x-2 mt-2">
            <Icon name="DollarSign" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">
              USD currency format will be applied
            </span>
          </div>
        </div>

        <div>
          <Input
            label="Missed Calls per Day"
            type="text"
            placeholder="Enter number (e.g., 5)"
            value={missedCallsPerDay}
            onChange={handleMissedCallsChange}
            error={errors?.missedCallsPerDay}
            description="Average number of calls you miss daily"
            required
            className="mb-1"
          />
          <div className="flex items-center space-x-2 mt-2">
            <Icon name="Phone" size={16} color="var(--color-muted-foreground)" />
            <span className="text-sm text-muted-foreground">
              Whole numbers only
            </span>
          </div>
        </div>

        <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={16} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">Calculation Method</h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Revenue loss is calculated by multiplying your average job value by the number of missed calls, 
                then projecting across different time periods (daily, weekly, monthly, annually).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InputPanel;