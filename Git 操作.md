# Git 操作
- [Git 操作](#git-操作)\
      - [用户设置](#用户设置)\
      - [文件操作](#文件操作)\
      - [重命名文件](#重命名文件)\
      - [更新远程代码到本地仓库](#更新远程代码到本地仓库)\
      - [解决Failed to connect to github.com port 443: Operation timed out](#解决failed-to-connect-to-githubcom-port-443-operation-timed-out)

#### 用户设置

`git config` 命令用于配置Git的设置，包括用户信息、仓库设置等。Git支持多个配置级别，每个级别对应了不同的范围，以便在不同的上下文中使用。以下是 `git config` 的各个配置级别：

1. **系统级别（System-Level）**:
   这是Git配置的最高级别，通常位于Git安装目录下的全局配置文件。它适用于整个系统中的所有用户，对所有仓库生效。

   设置系统级别的用户名和邮箱：
     ```bash
     git config --system user.name "Your Name"
     git config --system user.email "your.email@example.com"
     ```

   请注意，设置系统级别配置需要管理员权限。

2. **全局级别（Global-Level）**:
   全局级别配置存储在用户的主目录下的 `.gitconfig` 文件中。这些设置适用于当前用户的所有Git仓库。

   设置全局级别的用户名和邮箱：
     ```bash
     git config --global user.name "Your Name"
     git config --global user.email "your.email@example.com"
     ```

3. **仓库级别（Repository-Level）**:
   仓库级别配置存储在特定Git仓库的 `.git/config` 文件中。这些设置仅适用于当前仓库。

   设置仓库级别的用户名和邮箱：
     ```bash
     git config user.name "Your Name"
     git config user.email "your.email@example.com"
     ```

4. **命令行级别（Command-Line-Level）**:
   有时，你可以在命令行中直接使用`--global`或`--system`选项，来设置全局或系统级别的配置。这将覆盖之前的配置。

   例如，设置全局级别的用户名和邮箱：
     ```bash
     git config --global user.name "Your New Name"
     git config --global user.email "new.email@example.com"
     ```

请注意，配置级别具有优先级，高级别的配置会覆盖低级别的配置。如果在仓库级别设置了某个配置项，它将覆盖全局级别或系统级别的相同配置项。

可以使用 `git config --list` 命令来查看当前配置的详细信息，包括所有级别的配置项

#### 文件操作

大多数文件可直接通过GUI操作，但某些文件（如图像）要求从命令行移动它们

1. 使用

   ```
   git status
   ```

   检查旧文件位置和新文件位置

   ```shell
   $ git status
   > # On branch YOUR-BRANCH
   > # Changes not staged for commit:
   > #   (use "git add/rm ..." to update what will be committed)
   > #   (use "git checkout -- ..." to discard changes in working directory)
   > #
   > #     deleted:    /OLD-FOLDER/IMAGE.PNG
   > #
   > # Untracked files:
   > #   (use "git add ..." to include in what will be committed)
   > #
   > #     /NEW-FOLDER/IMAGE.PNG
   > #
   > # no changes added to commit (use "git add" and/or "git commit -a")
   ```

2. 将要提交的文件暂存到本地仓库。 这将从旧位置删除（即

   ```
   git rm
   ```

   ）文件，并将文件添加（即

   ```
   git add
   ```

   ）到新位置

   ```shell
   $ git add .
   # Adds the file to your local repository and stages it for commit.
   # 若要取消暂存文件，请使用“git reset HEAD YOUR-FILE”。
   ```

3. 使用

   ```
   git status
   ```

   检查为提交而暂存的更改

   ```shell
   $ git status
   > # On branch YOUR-BRANCH
   > # Changes to be committed:
   > #   (use "git reset HEAD ..." to unstage)
   > #
   > #    renamed:    /old-folder/image.png -> /new-folder/image.png
   # Displays the changes staged for commit
   ```

4. 提交暂存在本地仓库中的文件

   ```shell
   $ git commit -m "Move file to new directory"
   # Commits the tracked changes and prepares them to be pushed to a remote repository.
   # 要删除此提交并修改文件，请使用 'git reset --soft HEAD~1' 并再次提交和添加文件。
   ```

5. 将本地存储库中的

   更改推送

   到 GitHub.com

   ```shell
   $ git push origin YOUR_BRANCH
   # Pushes the changes in your local repository up to the remote repository you specified as the origin
   ```

#### 重命名文件

1. 将当前工作目录更改为您的本地仓库

2. 重命名文件，指定旧文件名和要为文件提供的新名称。 这将暂存您的提交更改

   ```shell
   $ git mv OLD-FILENAME NEW-FILENAME
   ```

3. 使用

   ```
   git status
   ```

   检查旧文件名和新文件名

   ```shell
   $ git status
   > # On branch YOUR-BRANCH
   > # Changes to be committed:
   > #   (use "git reset HEAD ..." to unstage)
   > #
   > #     renamed: OLD-FILENAME -> NEW-FILENAME
   > #
   ```

4. 提交暂存在本地仓库中的文件

   ```shell
   $ git commit -m "Rename file"
   # Commits the tracked changes and prepares them to be pushed to a remote repository.
   # 要删除此提交并修改文件，请使用 'git reset --soft HEAD~1' 并再次提交和添加文件。
   ```

5. 将本地存储库中的

   更改推送

   到 GitHub.com

   ```shell
   $ git push origin YOUR_BRANCH
   # Pushes the changes in your local repository up to the remote repository you specified as the origin
   ```

#### 更新远程代码到本地仓库

使用Git协同开发时，除了往服务器推送本地的代码也会经常从服务器上拉取代码，在拉取代码的还是除了使用`git pull`推送，还可以使用`git fetch`和`git merge`命令。

使用`git fetch`操作的好处是，`git fetch` 并没更改本地仓库的代码，只是拉取了远程 `commit` 数据，将远程仓库的 `commit id` 更新为`latest`。

- 查看远程仓库

```bash
git remote -v
```

> 默认情况下会有一个`origin`的远程仓库名

- 从远程获取最新版本到本地新建的分支

```bash
git fetch origin main:temp
```

- 比较区别

```bash
git diff temp
```

> 比较本地`master`分支和远程`master`分支的区别

- 合并分支

```bash
git merge temp
```

> 合并`temp`分支到`master`。

- 删除临时分支

```bash
git branch -d temp
```

> 如果该分支没有合并到主分支会报错，可以用命令强制删除`git branch -D <branch_name>`
