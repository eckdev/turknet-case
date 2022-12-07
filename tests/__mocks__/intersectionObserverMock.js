const mock =  function() {
    return {
      observe: jest.fn(),
      disconnect: jest.fn(),
    };
  };
  
  //--> assign mock directly without jest.fn
  window.IntersectionObserver = mock;