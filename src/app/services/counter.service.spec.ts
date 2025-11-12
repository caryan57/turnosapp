import { TestBed } from '@angular/core/testing';
import { CounterService } from './counter.service';

describe('CounterService - LocalStorage Methods', () => {
  let service: CounterService;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    
    TestBed.configureTestingModule({
      providers: [CounterService],
    });
    service = TestBed.inject(CounterService);
  });

  afterEach(() => {
    // Clean up localStorage after each test
    localStorage.clear();
  });

  describe('loadCounterFromLocalStorage', () => {
    it('should return 0 if no counter value is found in local storage', () => {
      // Arrange: Ensure localStorage is empty
      localStorage.removeItem('currentCounterValue');

      // Act
      const result = service.loadCounterFromLocalStorage();

      // Assert
      expect(result).toBe(0);
    });

    it('should return the correct numeric value when a counter value is found in local storage', () => {
      // Arrange
      const expectedValue = 42;
      localStorage.setItem('currentCounterValue', expectedValue.toString());

      // Act
      const result = service.loadCounterFromLocalStorage();

      // Assert
      expect(result).toBe(expectedValue);
    });
  });

  describe('setCounterToLocalStorage', () => {
    it('should correctly store the counter value in local storage', () => {
      // Arrange
      const valueToStore = 99;

      // Act
      service.setCounterToLocalStorage(valueToStore);

      // Assert
      const storedValue = localStorage.getItem('currentCounterValue');
      expect(storedValue).toBe(valueToStore.toString());
      expect(Number(storedValue)).toBe(valueToStore);
    });
  });

  describe('loadMuteFromLocalStorage', () => {
    it('should return false if no mute value is found in local storage', () => {
      // Arrange: Ensure localStorage is empty
      localStorage.removeItem('mute');

      // Act
      const result = service.loadMuteFromLocalStorage();

      // Assert
      expect(result).toBe(false);
    });

    it('should return the correct boolean value when a mute value is found in local storage', () => {
      // Arrange & Act & Assert - Test true value
      localStorage.setItem('mute', 'true');
      let result = service.loadMuteFromLocalStorage();
      expect(result).toBe(true);

      // Arrange & Act & Assert - Test false value
      localStorage.setItem('mute', 'false');
      result = service.loadMuteFromLocalStorage();
      expect(result).toBe(false);
    });
  });
});
