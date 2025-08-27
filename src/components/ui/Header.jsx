import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card border-b border-border shadow-elevation-1">
      <div className="flex items-center justify-between h-16 px-6">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Calculator" size={20} color="white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold text-foreground leading-tight">
              Revenue Calculator
            </h1>
            <span className="text-xs text-muted-foreground leading-tight">
              Missed Call Analysis
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            className="text-foreground hover:text-primary hover:bg-muted/50 px-4 py-2"
          >
            Calculator
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary hover:bg-muted/50 px-4 py-2"
          >
            Reports
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary hover:bg-muted/50 px-4 py-2"
          >
            Analytics
          </Button>
          <Button
            variant="ghost"
            className="text-muted-foreground hover:text-primary hover:bg-muted/50 px-4 py-2"
          >
            History
          </Button>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Download"
              iconPosition="left"
              className="text-muted-foreground border-border hover:border-primary hover:text-primary"
            >
              Export
            </Button>
            <Button
              variant="default"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              className="bg-primary hover:bg-primary/90"
            >
              New Analysis
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleMenu}
            className="md:hidden text-muted-foreground hover:text-primary hover:bg-muted/50"
          >
            <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border shadow-elevation-2">
          <nav className="px-6 py-4 space-y-2">
            <Button
              variant="ghost"
              fullWidth
              className="justify-start text-foreground hover:text-primary hover:bg-muted/50 px-3 py-2"
            >
              <Icon name="Calculator" size={16} className="mr-3" />
              Calculator
            </Button>
            <Button
              variant="ghost"
              fullWidth
              className="justify-start text-muted-foreground hover:text-primary hover:bg-muted/50 px-3 py-2"
            >
              <Icon name="FileText" size={16} className="mr-3" />
              Reports
            </Button>
            <Button
              variant="ghost"
              fullWidth
              className="justify-start text-muted-foreground hover:text-primary hover:bg-muted/50 px-3 py-2"
            >
              <Icon name="BarChart3" size={16} className="mr-3" />
              Analytics
            </Button>
            <Button
              variant="ghost"
              fullWidth
              className="justify-start text-muted-foreground hover:text-primary hover:bg-muted/50 px-3 py-2"
            >
              <Icon name="History" size={16} className="mr-3" />
              History
            </Button>
            
            <div className="pt-3 mt-3 border-t border-border space-y-2">
              <Button
                variant="outline"
                fullWidth
                iconName="Download"
                iconPosition="left"
                className="justify-center text-muted-foreground border-border hover:border-primary hover:text-primary"
              >
                Export Data
              </Button>
              <Button
                variant="default"
                fullWidth
                iconName="Plus"
                iconPosition="left"
                className="justify-center bg-primary hover:bg-primary/90"
              >
                New Analysis
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;