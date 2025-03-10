이 패키지는 `.env` 파일에 저장된 환경 변수를 로드하는 데 사용됩니다.

**설치 방법**

`python-dotenv` 패키지는 `pip`를 사용하여 간단하게 설치할 수 있습니다. 다음 명령어를 터미널 또는 명령 프롬프트에 입력하세요.

Bash

```
pip install python-dotenv
```

**설치 확인**

설치가 완료되면, 다음 명령어를 사용하여 설치된 패키지 목록에서 `python-dotenv`를 확인할 수 있습니다.

Bash

```
pip list
```

**사용 방법**

1. **.env 파일 생성**: 프로젝트 루트 디렉토리에 `.env` 파일을 생성하고, 환경 변수를 다음과 같은 형식으로 추가합니다.
    
    ```
    VARIABLE_NAME=variable_value
    ```
    
    예시:
    
    ```
    API_KEY=your_api_key
    DATABASE_URL=your_database_url
    ```
    
2. **코드에서 사용**: Python 코드에서 `dotenv` 패키지를 사용하여 `.env` 파일을 로드하고, 환경 변수를 사용합니다.
    
    Python
    
    ```
    import os
    from dotenv import load_dotenv
    
    load_dotenv()  # .env 파일 로드
    
    api_key = os.getenv("API_KEY")
    database_url = os.getenv("DATABASE_URL")
    
    print(f"API Key: {api_key}")
    print(f"Database URL: {database_url}")
    ```
    

**설치 및 사용 시 참고 사항**

- **.env 파일 위치**: 기본적으로 `load_dotenv()` 함수는 현재 작업 디렉토리 또는 상위 디렉토리에서 `.env` 파일을 찾습니다. 만약 다른 위치에 `.env` 파일이 있다면, `find_dotenv()` 함수를 사용하여 파일 경로를 지정할 수 있습니다.
- **환경 변수 접근**: `os.getenv()` 함수를 사용하여 환경 변수에 접근할 수 있습니다.
- **보안**: `.env` 파일은 민감한 정보를 포함할 수 있으므로, 버전 관리 시스템(예: Git)에서 제외하는 것이 좋습니다. `.gitignore` 파일에 `.env`를 추가하여 버전 관리 대상에서 제외하세요.

이러한 방법으로 `python-dotenv` 패키지를 설치하고 사용할 수 있습니다.

---
## .env 파일 생성방법

`.env` 파일은 일반 텍스트 파일이며, 특별한 도구나 복잡한 과정 없이 간단하게 생성할 수 있습니다. 다음은 운영체제별로 `.env` 파일을 생성하는 방법입니다.

**1. 텍스트 편집기 사용 (모든 운영체제)**

가장 간단한 방법은 텍스트 편집기를 사용하는 것입니다.

- **텍스트 편집기 실행:** 메모장 (Windows), 텍스트 편집기 (macOS), gedit, nano, vim (Linux) 등 원하는 텍스트 편집기를 실행합니다.
- **내용 작성:** 다음과 같은 형식으로 환경 변수를 작성합니다.

```
VARIABLE_NAME=variable_value
ANOTHER_VARIABLE=another_value
```

예시:

```
API_KEY=your_secret_api_key
DATABASE_URL=your_database_connection_string
```

- **파일 저장:** 파일을 `.env`라는 이름으로 저장합니다. 중요한 점은 파일 이름이 정확히 `.env`여야 한다는 것입니다.
- **파일 위치:** 프로젝트의 루트 디렉토리에 파일을 저장합니다. 일반적으로 `main.py` 파일이나 다른 주요 스크립트 파일과 같은 위치에 저장합니다.

**2. 터미널 또는 명령 프롬프트 사용 (macOS, Linux, Windows)**

터미널 또는 명령 프롬프트를 사용하여 `.env` 파일을 생성할 수도 있습니다.

- **터미널 또는 명령 프롬프트 실행:** 터미널 (macOS, Linux) 또는 명령 프롬프트 (Windows)를 실행합니다.
- **프로젝트 디렉토리로 이동:** `cd` 명령어를 사용하여 `.env` 파일을 생성할 프로젝트 디렉토리로 이동합니다.

Bash

```
cd /path/to/your/project
```

- **파일 생성 및 내용 작성:** 다음 명령어를 사용하여 `.env` 파일을 생성하고 내용을 작성합니다.
    
    - **macOS/Linux (터미널, `echo` 및 리디렉션 사용):**
    
    Bash
    
    ```
    echo "VARIABLE_NAME=variable_value" > .env
    echo "ANOTHER_VARIABLE=another_value" >> .env
    ```
    
    - **Windows (명령 프롬프트, `echo` 및 리디렉션 사용):**
    
    Bash
    
    ```
    echo VARIABLE_NAME=variable_value > .env
    echo ANOTHER_VARIABLE=another_value >> .env
    ```
    
    - **vi/vim 편집기 사용 (macOS/Linux):**
    
    Bash
    
    ```
    vi .env
    ```
    
    `i` 키를 눌러 입력 모드로 전환하고, 내용을 작성한 다음 `Esc` 키를 누르고 `:wq`를 입력하여 저장하고 종료합니다.
    

**3. Visual Studio Code (VS Code) 사용**

VS Code와 같은 코드 편집기를 사용하는 경우, 편집기 내에서 파일을 생성할 수 있습니다.

- **VS Code 실행:** VS Code를 실행합니다.
- **새 파일 생성:** `Ctrl + N` (Windows/Linux) 또는 `Cmd + N` (macOS)을 눌러 새 파일을 생성합니다.
- **내용 작성:** 환경 변수를 작성합니다.
- **파일 저장:** `Ctrl + S` (Windows/Linux) 또는 `Cmd + S` (macOS)를 눌러 파일을 `.env`라는 이름으로 저장하고, 프로젝트의 루트 디렉토리에 저장합니다.

**주의사항**

- **.env 파일 이름:** 파일 이름이 정확히 `.env`여야 합니다.
- **파일 위치:** 프로젝트의 루트 디렉토리에 파일을 저장합니다.
- **민감한 정보 관리:** `.env` 파일에 민감한 정보를 저장하는 경우, 버전 관리 시스템(예: Git)에서 제외해야 합니다. `.gitignore` 파일에 `.env`를 추가하여 버전 관리 대상에서 제외하세요.