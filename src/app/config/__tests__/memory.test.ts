import { MMKV } from 'react-native-mmkv';

import { Memory } from '@config/memory';

describe('memory', () => {
  const mockKey = 'key';
  const mockValue = 'value';
  const mmkvMock = new MMKV();
  const memory = new Memory(mmkvMock);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('setItem should stringify value and call mmkv set method with correct params', () => {
    memory.setItem(mockKey, mockValue);

    expect(mmkvMock.set).toHaveBeenCalledWith(mockKey, JSON.stringify(mockValue));
  });

  it('clear should call mmkv clearAll method', () => {
    memory.clear();

    expect(mmkvMock.clearAll).toHaveBeenCalled();
  });

  it('clear should call mmkv clearAll method', () => {
    memory.removeItem(mockKey);

    expect(mmkvMock.delete).toHaveBeenCalled();
  });

  describe('getItem', () => {
    it('should call mmkv getString method', () => {
      memory.getItem(mockKey);

      expect(mmkvMock.getString).toHaveBeenCalled();
    });

    it('should parse received value from JSON', () => {
      (mmkvMock.getString as jest.Mock).mockReturnValueOnce(JSON.stringify(mockValue));

      const valueFromMemory = memory.getItem(mockKey);

      expect(valueFromMemory).toEqual(mockValue);
    });

    it('should return null if such value missed in memory', () => {
      (mmkvMock.getString as jest.Mock).mockReturnValueOnce(null);

      const valueFromMemory = memory.getItem(mockKey);

      expect(valueFromMemory).toBeNull();
    });
  });
});
