import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = React.useState(today);
  
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };
  
  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };
  
  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };
  
  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };
  
  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const daysInMonth = getDaysInMonth(currentDate);
  const firstDay = getFirstDayOfMonth(currentDate);
  
  return (
    <Card className="w-full h-full bg-gradient-to-b from-[#A8C3A1]/90 to-[#6D8F71]/90 border border-[#2E6036]/30 shadow-lg backdrop-blur-sm flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 p-4 border-b border-[#2E6036]/30">
        <CardTitle className="text-lg font-semibold text-[#2E6036]">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-[#8A9A5B]/20 text-[#2E6036]"
            onClick={previousMonth}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 hover:bg-[#8A9A5B]/20 text-[#2E6036]"
            onClick={nextMonth}
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        <div className="grid grid-cols-7 gap-2 h-full">
          {days.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-[#2E6036] uppercase"
            >
              {day}
            </div>
          ))}
          {Array.from({ length: firstDay }).map((_, index) => (
            <div key={`empty-${index}`} className="opacity-20" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, index) => (
            <div
              key={index}
              className={`text-center flex items-center justify-center text-sm rounded-full transition-all duration-200 aspect-square ${
                isToday(index + 1)
                  ? 'bg-[#2E6036] text-white shadow-md scale-105'
                  : 'text-[#2E6036] hover:bg-[#8A9A5B]/30 hover:text-[#5E877B]'
              }`}
            >
              {index + 1}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Calendar; 