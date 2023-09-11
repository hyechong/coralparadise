import { styled } from 'styled-components';

export const SliderWrapper = styled.div`
  width: 100%;
  height: auto;

  .slick-slide {
    overflow: hidden;
    padding: 1.5rem;
  }

  .slide-item {
    position: relative;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: -3px 3px 10px #ccc;
    height: 400px;

    .slider-img {
      position: absolute;
      top: 0;
      width: 100%;
      height: 60%;
    }
    .slider-img img {
      width: 100%;
      height: 100%;
    }

    .slider-text {
      position: absolute;
      bottom: 0;
      background: #fff;
      width: 100%;
      padding: 1rem;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      h3 {
        line-height: 120%;
        font-size: 1.125rem;
        letter-spacing: 0;
      }

      p {
        display: flex;
        flex-direction: column;
        gap: 0.125rem;
        em {
          color: #999;
          margin-right: 0.5rem;
        }
        span {
          color: ${({ theme }) => theme.colors.point};
        }
      }

      a:hover {
        text-decoration: underline;
      }
    }
  }

  .slick-prev,
  .slick-next {
    z-index: 999;
    background: #fff;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: inline-block;
    color: ${({ theme }) => theme.colors.point};
    border: 2px solid ${({ theme }) => theme.colors.point};
    transition: all 0.4s;
    &:hover {
      background: ${({ theme }) => theme.colors.point};
      color: #fff;
    }
  }

  .slick-prev {
    left: -60px;
  }

  .slick-next {
    right: -60px;
  }
`;

export const BestSlider = styled(SliderWrapper)`
  margin-top: 2.5rem;
  overflow: hidden;

  .slick-slide > div {
    height: 100%;
  }

  .slide-item {
    border-radius: 0;
    height: 100%;

    .slider-text {
      position: absolute;
      background: transparent;
      width: 100%;
      height: 100%;

      span {
        position: absolute;
        width: 60px;
        height: 60px;
        display: flex;
        align-items: center;
        justify-content: center;
        right: 0;
        top: 0;
        background: ${({ theme }) => theme.colors.point};
        color: #fff;
      }

      h3 {
        text-transform: uppercase;
        color: #fff;
        font-weight: 700;
        font-family: 'Inter', sans-serif;
        letter-spacing: -1px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
      h3:hover {
        text-decoration: underline;
      }
    }
  }

  .slick-list {
    overflow: visible;
    .slick-slide {
      padding: 0.5rem;
      height: 450px;
      position: relative;
    }
  }
`;
