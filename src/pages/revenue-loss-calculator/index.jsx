import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import InputPanel from './components/InputPanel';
import ResultsPanel from './components/ResultsPanel';
import TrustIndicators from './components/TrustIndicators';
import CalculationSummary from './components/CalculationSummary';
import Icon from '../../components/AppIcon';

const RevenueLossCalculator = () => {
  const [averageJobValue, setAverageJobValue] = useState('');
  const [missedCallsPerDay, setMissedCallsPerDay] = useState('');
  const [calculations, setCalculations] = useState({
    daily: 0,
    weekly: 0,
    monthly: 0,
    annual: 0
  });
  const [errors, setErrors] = useState({});

  // Real-time calculation effect
  useEffect(() => {
    const jobValue = parseFloat(averageJobValue) || 0;
    const missedCalls = parseInt(missedCallsPerDay) || 0;

    if (jobValue > 0 && missedCalls > 0) {
      const daily = jobValue * missedCalls;
      const weekly = daily * 7;
      const monthly = daily * 30;
      const annual = daily * 365;

      setCalculations({
        daily,
        weekly,
        monthly,
        annual
      });
    } else {
      setCalculations({
        daily: 0,
        weekly: 0,
        monthly: 0,
        annual: 0
      });
    }
  }, [averageJobValue, missedCallsPerDay]);

  // Input validation
  useEffect(() => {
    const newErrors = {};

    if (averageJobValue && (isNaN(parseFloat(averageJobValue)) || parseFloat(averageJobValue) <= 0)) {
      newErrors.averageJobValue = 'Please enter a valid positive number';
    }

    if (missedCallsPerDay && (isNaN(parseInt(missedCallsPerDay)) || parseInt(missedCallsPerDay) <= 0)) {
      newErrors.missedCallsPerDay = 'Please enter a valid positive number';
    }

    setErrors(newErrors);
  }, [averageJobValue, missedCallsPerDay]);

  const handleReset = () => {
    setAverageJobValue('');
    setMissedCallsPerDay('');
    setCalculations({
      daily: 0,
      weekly: 0,
      monthly: 0,
      annual: 0
    });
    setErrors({});
  };

  const formatCurrency = (amount) => {
    if (!amount || isNaN(amount)) return '$0.00';
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })?.format(amount);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-2xl mx-auto mb-6">
              <Icon name="Calculator" size={32} color="var(--color-primary)" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Missed Call Revenue Calculator
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Quantify the financial impact of missed customer calls on your business. 
              Calculate potential revenue loss and make informed decisions about your customer service strategy.
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="mb-8">
            <TrustIndicators />
          </div>

          {/* Main Calculator Interface */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Input Panel */}
            <div>
              <InputPanel
                averageJobValue={averageJobValue}
                setAverageJobValue={setAverageJobValue}
                missedCallsPerDay={missedCallsPerDay}
                setMissedCallsPerDay={setMissedCallsPerDay}
                onReset={handleReset}
                errors={errors}
              />
            </div>

            {/* Results Panel */}
            <div>
              <ResultsPanel calculations={calculations} />
            </div>
          </div>

          {/* Calculation Summary */}
          {(averageJobValue || missedCallsPerDay) && (
            <div className="mb-8">
              <CalculationSummary
                averageJobValue={averageJobValue}
                missedCallsPerDay={missedCallsPerDay}
                calculations={calculations}
              />
            </div>
          )}

          {/* Business Impact Insights */}
          {calculations?.annual > 0 && (
            <div className="bg-card rounded-lg border border-border shadow-elevation-2 p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                  <Icon name="TrendingUp" size={20} color="var(--color-accent)" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">Business Recommendations</h2>
                  <p className="text-sm text-muted-foreground">Actionable insights based on your calculations</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Phone" size={16} color="var(--color-primary)" />
                    <span className="text-sm font-medium text-foreground">Call Management</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Consider implementing call forwarding or auto-attendant systems to capture more calls.
                  </p>
                </div>

                <div className="bg-background rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Users" size={16} color="var(--color-accent)" />
                    <span className="text-sm font-medium text-foreground">Staff Expansion</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Your revenue loss of {formatCurrency(calculations?.annual)} annually could justify hiring additional staff.
                  </p>
                </div>

                <div className="bg-background rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Icon name="Clock" size={16} color="var(--color-warning)" />
                    <span className="text-sm font-medium text-foreground">Extended Hours</span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Extending business hours could help capture calls currently being missed.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Footer Information */}
          <div className="mt-12 text-center">
            <div className="bg-muted/20 rounded-lg border border-border/50 p-6">
              <div className="flex items-center justify-center space-x-2 mb-3">
                <Icon name="Info" size={16} color="var(--color-primary)" />
                <span className="text-sm font-medium text-foreground">About This Calculator</span>
              </div>
              <p className="text-xs text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                This calculator provides estimates based on your input parameters. Actual revenue impact may vary depending on 
                factors such as call conversion rates, seasonal variations, and business-specific circumstances. 
                Use these calculations as a starting point for evaluating customer service investments.
              </p>
              <div className="mt-4 text-xs text-muted-foreground">
                <span>© {new Date()?.getFullYear()} Revenue Calculator. All calculations are performed locally - no data is stored or transmitted.</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default RevenueLossCalculator;